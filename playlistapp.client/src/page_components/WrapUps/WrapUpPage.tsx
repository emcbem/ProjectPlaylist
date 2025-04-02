import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import LoadingPage from "@/individual_components/LoadingPage";
import React, { useEffect, useState } from "react";
import { GetWrapUpRequest } from "@/@types/Requests/GetRequests/getWrapUpRequest";
import { WrapUpService } from "@/ApiServices/WrapUpService";
import GameCarousel from "./GameCarousel";
import { WrapUp } from "@/@types/WrapUps/WrapUp";
import HourBarChart from "./HourBarChart";
import DateRangeSelector from "./DateRangeSelector/DateRangeSelector";

const WrapUpPage = () => {
  const { userGuid, isLoading: isAccountLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const [wrapUpRequest, setWrapUpRequest] = useState<GetWrapUpRequest>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<number>();
  const [wrapUp, setWrapUp] = useState<WrapUp>();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
    makeWrapUpRequest();
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
    makeWrapUpRequest();
  };

  const makeWrapUpRequest = () => {
    const _wrapUpRequest: GetWrapUpRequest = {
      userId: userGuid ?? "",
      year: selectedMonth ?? 0,
      month: selectedYear ?? 0,
    };
    setWrapUpRequest(_wrapUpRequest);
  };

  useEffect(() => {
    const fetchWrapUpData = async () => {
      if (wrapUpRequest) {
        try {
          const response = await WrapUpService.GetWrapUp(wrapUpRequest);
          setWrapUp(response);
        } catch (error) {
          console.error("Error fetching wrapup.");
        }
      }
    };

    fetchWrapUpData();
  }, [wrapUpRequest]);

  if (isAccountLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <div className="grid justify-items-center ">
          <div style={{ maxWidth: "1200px" }} className="w-full mt-8">
            <div className="text-center">
              <h1 className="text-3xl my-5">Your Wrap Ups</h1>
            </div>
            <DateRangeSelector
              setSelectedYear={handleYearChange}
              setSelectedMonth={handleMonthChange}
            />
          </div>
          {/* {wrapUp && ( */}
          <>
            <div className="text-center mt-24 sm:mt-10 text-2xl dark:text-gray-200">
              You played{" "}
              <span className="font-bold dark:text-white">
                {wrapUp?.gamesPlayed.length}
              </span>
              <br /> number of games
            </div>
            <GameCarousel carouselGames={wrapUp?.gamesPlayed} />

            <HourBarChart HourBarChartData={wrapUp?.barGraphGameData} />
          </>

          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default WrapUpPage;
