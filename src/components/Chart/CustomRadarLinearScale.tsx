import { RadialLinearScale } from "chart.js";
import {
    TAU,
    addRoundedRectPath,
    isNullOrUndef,
    renderText,
    toFont,
    toPadding,
    toTRBLCorners
} from "chart.js/helpers";

const DEBUG = false;

function drawPointLabels(scale, labelCount) {
    const {
        ctx,
        options: { pointLabels }
    } = scale;

    for (let i = labelCount - 1; i >= 0; i--) {
        const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
        const plFont = toFont(optsAtIndex.font);
        const { x, y, left, top, right, bottom } = scale._pointLabelItems[i];
        const { backdropColor } = optsAtIndex;

        let origin = {
            x,
            y: y + plFont.lineHeight / 2
        };

        ctx.save();

        ctx.translate(origin.x, origin.y);
        ctx.rotate(Math.PI * 2 * (i / labelCount));

        const padding = toPadding(optsAtIndex.backdropPadding);

        if (!isNullOrUndef(backdropColor)) {
            const borderRadius = toTRBLCorners(optsAtIndex.borderRadius);

            ctx.fillStyle = backdropColor;

            const backdropWidth = right - left + padding.width;
            const backdropHeight = bottom - top + padding.height;
            const backdropLeft = -backdropWidth / 2 - padding.left;
            const backdropTop = -backdropHeight / 2 - padding.top;

            if (Object.values(borderRadius).some((v) => v !== 0)) {
                ctx.beginPath();
                addRoundedRectPath(ctx, {
                    x: backdropLeft,
                    y: backdropTop,
                    w: backdropWidth,
                    h: backdropHeight,
                    radius: borderRadius
                });
                ctx.fill();
            } else {
                ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
            }
        }

        renderText(
            ctx,
            scale._pointLabels[i],
            -padding.left,
            -padding.top,
            plFont,
            {
                color: optsAtIndex.color,
                textAlign: "center",
                textBaseline: "middle"
            }
        );

        if (DEBUG) {
            ctx.fillStyle = "hsla(180, 100%, 80%, 0.667)";
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.restore();
    }
}

function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
    const ctx = scale.ctx;
    const circular = gridLineOpts.circular;

    const { color, lineWidth } = gridLineOpts;

    if ((!circular && !labelCount) || !color || !lineWidth || radius < 0) {
        return;
    }

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(borderOpts.dash);
    ctx.lineDashOffset = borderOpts.dashOffset;

    ctx.beginPath();
    pathRadiusLine(scale, radius, circular, labelCount);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function pathRadiusLine(scale, radius, circular, labelCount) {
    const { ctx } = scale;
    if (circular) {
        // Draw circular arcs between the points
        ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
    } else {
        // Draw straight lines connecting each index
        let pointPosition = scale.getPointPosition(0, radius);
        ctx.moveTo(pointPosition.x, pointPosition.y);

        for (let i = 1; i < labelCount; i++) {
            pointPosition = scale.getPointPosition(i, radius);
            ctx.lineTo(pointPosition.x, pointPosition.y);
        }
    }
}

// https://www.chartjs.org/docs/latest/developers/axes.html
class CustomRadialLinearScale extends RadialLinearScale {
    // https://github.com/chartjs/Chart.js/blob/master/src/scales/scale.radialLinear.js
    drawGrid() {
        const ctx = this.ctx;
        const opts = this.options;
        const { angleLines, grid, border } = opts;
        const labelCount = this._pointLabels.length;

        let i, offset, position;

        if (opts.pointLabels.display) {
            drawPointLabels(this, labelCount);
        }

        if (grid.display) {
            this.ticks.forEach((tick, index) => {
                if (index !== 0) {
                    offset = this.getDistanceFromCenterForValue(tick.value);
                    const context = this.getContext(index);
                    const optsAtIndex = grid.setContext(context);
                    const optsAtIndexBorder = border.setContext(context);

                    drawRadiusLine(
                        this,
                        optsAtIndex,
                        offset,
                        labelCount,
                        optsAtIndexBorder
                    );
                }
            });
        }

        if (angleLines.display) {
            ctx.save();

            for (i = labelCount - 1; i >= 0; i--) {
                const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                const { color, lineWidth } = optsAtIndex;

                if (!lineWidth || !color) {
                    continue;
                }

                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;

                ctx.setLineDash(optsAtIndex.borderDash);
                ctx.lineDashOffset = optsAtIndex.borderDashOffset;

                offset = this.getDistanceFromCenterForValue(
                    opts.ticks.reverse ? this.min : this.max
                );
                position = this.getPointPosition(i, offset);
                ctx.beginPath();
                ctx.moveTo(this.xCenter, this.yCenter);
                ctx.lineTo(position.x, position.y);
                ctx.stroke();
            }

            ctx.restore();
        }
    }
}

CustomRadialLinearScale.id = "derivedRadialLinearScale";
CustomRadialLinearScale.defaults = RadialLinearScale.defaults;

export default CustomRadialLinearScale;
