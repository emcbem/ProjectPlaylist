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
import { useParams } from "react-router-dom";
import { UserAccountQueries } from "@/queries/UserAccountQueries";
import BlackButton from "@/components/ui/BlackButton";
import toast from "react-hot-toast";

const WrapUpPage = () => {
  const { id, month, year } = useParams<{
    id: string;
    month: string;
    year: string;
  }>();

  const { userGuid, isLoading: isAccountLoading } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const userId = id ?? userGuid;

  const { data: usr } = UserAccountQueries.useGetUserById(userId!);

  const userName = id ? usr?.username : "You";

  const [wrapUpRequest, setWrapUpRequest] = useState<GetWrapUpRequest>();
  const [selectedYear, setSelectedYear] = useState<number>(
    Number.parseInt(year ?? "-1") ?? ""
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    Number.parseInt(month ?? "-1") ?? ""
  );
  const [wrapUp, setWrapUp] = useState<WrapUp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    makeWrapUpRequest(selectedMonth, year);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
    makeWrapUpRequest(Number(event.target.value), selectedYear);
  };

  useEffect(() => {
    if (id) {
      makeWrapUpRequest();
    }
  }, [id]);

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
      userId: userId ?? "",
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

  const handleShare = () => {
    const shareUrl =
      window.location.href + `/${userId}/${selectedMonth}/${selectedYear}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  if (isAccountLoading) {
    return (
      <div className="mt-24">
        <LoadingPage />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <div className="grid justify-items-center">
          <div style={{ maxWidth: "1200px" }} className="w-full mt-8">
            <div className="text-center">
              {!id ? (
                <h1 className="text-3xl my-5">Your Wrap Ups</h1>
              ) : (
                <h1 className="text-3xl my-5">{usr?.username}'s Wrap Up</h1>
              )}
            </div>
            {!id && (
              <DateRangeSelector
                setSelectedYear={handleYearChange}
                setSelectedMonth={handleMonthChange}
              />
            )}
          </div>
          {isLoading == true && (
            <div className="mt-24">
              <LoadingDots />
            </div>
          )}
          {wrapUp && (
            <>
              <GameCarousel
                carouselGames={wrapUp?.gamesPlayed}
                userName={userName ?? "You"}
              />

              <HourBarChart
                HourBarChartData={wrapUp?.barGraphGameData}
                userName={userName ?? "You"}
              />

              <HourLineGraph graphData={wrapUp.hourGraph} />

              <TopGameWrapUp
                TopGameData={wrapUp?.topGame}
                userName={userName ?? "Your"}
              />

              <AchievementWrapUp
                achievementGroups={wrapUp.achievementGroups}
                userName={userName ?? "You"}
              />

              {wrapUp.trophiesEarned > 0 && (
                <p className="text-center text-2xl mt-6">
                  {userName} earned{" "}
                  <span className="font-bold">{wrapUp.trophiesEarned}</span>{" "}
                  PlayStation troph{wrapUp.trophiesEarned > 1 ? "ies" : "y"}
                </p>
              )}
              {!id && (
                <BlackButton
                  className="dark:bg-cyan-400 bg-cyan-400 text-black mb-48 mt-10 font-semibold text-xl"
                  onClick={handleShare}
                >
                  Share
                </BlackButton>
              )}
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
