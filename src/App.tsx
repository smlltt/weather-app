import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherCard from "./components/WeatherCard";
import { format } from "date-fns";
import RecentSearches from "./components/RecentSearches";
import Chart from "./components/Chart.tsx";
import Form from "./components/Form";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={
          "p-5 mx-auto max-w-6xl md:flex md:justify-between md:px-20 md:gap-2"
        }
      >
        <div>
          <div className={"pb-2 text-blue-400 text-lg "}>
            {format(new Date(), "d MMM, yyyy")}
          </div>
          <div>
            <Form />
            <RecentSearches />
            <WeatherCard />
          </div>
        </div>
        <div className={"my-auto"}>
          <Chart />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
