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
import HourLineGraph from "./HourLineGraph";
import LoadingDots from "@/individual_components/NavbarProfileSection";
import TopGameWrapUp from "./TopGame";
import AchievementWrapUp from "./AchievementWrapUp";

const WrapUpPage = () => {
  const { userGuid, isLoading: isAccountLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const [wrapUpRequest, setWrapUpRequest] = useState<GetWrapUpRequest>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<number>();
  const [wrapUp, setWrapUp] = useState<WrapUp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleYearChange = (year: number | undefined) => {
    setSelectedYear(year);
    makeWrapUpRequest(selectedMonth, year);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
    makeWrapUpRequest(Number(event.target.value), selectedYear);
  };

  const makeWrapUpRequest = (month = selectedMonth, year = selectedYear) => {
    var mo = month;
    var ye = year;

    if (month === 0 || month === undefined) {
      mo = -1;
    }
    if (year === 0 || year === undefined) {
      ye = -1;
    }

    const _wrapUpRequest: GetWrapUpRequest = {
      userId: userGuid ?? "",
      month: mo ?? -1,
      year: ye ?? 2025,
    };
    console.log(_wrapUpRequest);
    setWrapUpRequest(_wrapUpRequest);
  };

  useEffect(() => {
    const fetchWrapUpData = async () => {
      if (wrapUpRequest) {
        setIsLoading(true);
        try {
          const response = await WrapUpService.GetWrapUp(wrapUpRequest);
          setWrapUp(response);
          setIsLoading(false);
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
        <div className="grid justify-items-center mb-48">
          <div style={{ maxWidth: "1200px" }} className="w-full mt-8">
            <div className="text-center">
              <h1 className="text-3xl my-5">Your Wrap Ups</h1>
            </div>
            <DateRangeSelector
              setSelectedYear={handleYearChange}
              setSelectedMonth={handleMonthChange}
            />
          </div>
          {isLoading == true && <LoadingDots />}
          {wrapUp && (
            <>
              <div className="text-center mt-24 text-2xl dark:text-gray-200">
                You played{" "}
                <span className="font-semibold text-4xl dark:text-white">
                  {
                    wrapUp?.barGraphGameData.filter((x) => x.timePlayed > 0)
                      .length
                  }
                </span>
                <br /> games
              </div>
              <GameCarousel carouselGames={wrapUp?.gamesPlayed} />

              <HourBarChart HourBarChartData={wrapUp?.barGraphGameData} />

              <HourLineGraph graphData={wrapUp.hourGraph} />

              <TopGameWrapUp TopGameData={wrapUp?.topGame} />

              <AchievementWrapUp achievementGroups={wrapUp.achievementGroups} />
            </>
          )}
          {!wrapUp && !isLoading && (
            <p className="mt-3 dark:text-white text-gray-600">
              There is no data for this time frame.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default WrapUpPage;
