import { createSelector } from "reselect";

import { InitState } from "store/reducer";
import { Statistic } from "store/types";

const ONE_MONTH = 1;
const FOUR_MONTH = 4;

export const selectToken = (state: InitState) => state.accessToken;
export const selectAuth = (state: InitState) => state.auth;
export const selectLogin = (state: InitState) => state.login;
export const selectUser = (state: InitState) => state.user;
export const selectStatistic = (state: InitState) => state.statisticDD;

const sortedStatistic = createSelector(selectStatistic, (statistic) => {
  return statistic.slice().sort((a, b) => a.date - b.date);
});

export const lastDataSelector = createSelector(
  sortedStatistic,
  (statistic) => statistic[statistic.length - 1]
);

const lastTimestamp = createSelector(lastDataSelector, (statisticData) =>
  statisticData ? statisticData.date : 0
);

const startMonthlyPeriod = createSelector(lastTimestamp, (timestamp) =>
  timestamp === 0
    ? 0
    : new Date(timestamp).setMonth(new Date(timestamp).getMonth() - ONE_MONTH)
);

const startQuarterlyPeriod = createSelector(lastTimestamp, (timestamp) =>
  timestamp === 0
    ? 0
    : new Date(timestamp).setMonth(new Date(timestamp).getMonth() - FOUR_MONTH)
);

const averageDSbyMonth = (statistics: Statistic[]) => {
  let newData = [];
  let accumulatorData = parseFloat(statistics[0].ds);
  let count = 1;

  for (let i = 1; i < statistics.length; i++) {
    const thisDate = statistics[i].date;
    const prevDate = statistics[i - 1].date;

    const thisDay = {
      day: new Date(thisDate).getDate(),
      month: new Date(thisDate).toLocaleDateString("en-US", { month: "short" }),
    };

    const prevDay = {
      day: new Date(prevDate).getDate(),
      month: new Date(prevDate).toLocaleDateString("en-US", { month: "short" }),
    };

    if (thisDay.day === prevDay.day && thisDay.month === prevDay.month) {
      accumulatorData = accumulatorData + parseFloat(statistics[i].ds);
      count = count + 1;
    } else {
      newData.push({
        ds: accumulatorData / count,
        ...prevDay,
      });
      accumulatorData = 0;
      count = 0;
    }
  }

  return newData;
};

export const monthlyStatistics = createSelector(
  [sortedStatistic, startMonthlyPeriod],
  (sortedData, start) => sortedData.filter(({ date }) => date > start)
);

export const quarterlyStatistics = createSelector(
  [sortedStatistic, startQuarterlyPeriod],
  (sortedData, start) => sortedData.filter(({ date }) => date > start)
);

export const selectAverageData = createSelector(quarterlyStatistics, (data) =>
  averageDSbyMonth(data)
);
