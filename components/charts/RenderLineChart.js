import styles from "./RenderChart.module.scss";
import { ResponsiveLine } from "@nivo/line";
import { useGetLogsData } from "../../util/useRequest";
import { parseISO } from "date-fns";

const theme = {
  textColor: "#fff",
  tooltip: {
    container: {
      background: "#000",
    },
    color: "#fff",
  },
};

const getWeekStart = () => {
  const date = new Date();
  const day = date.getDay();
  return new Date(date.setDate(date.getDate() - day + (day == 0 ? -6 : 1) - 7));
};

const getDate = (days) => {
  const date = getWeekStart();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const RenderLineChart = ({ user }) => {
  const dateFrom = getDate(0);
  const dateTo = getDate(6);
  const { logsData, logsError } = useGetLogsData(
    "",
    1,
    user?._id,
    "",
    "",
    dateFrom,
    dateTo
  );

  if (logsError || !logsData) {
    return (
      <div className={styles.RenderChart}>
        <h1 className={styles.chartHeader}>Games Played</h1>
        <p className={styles.chartInfo}>Feb 22 - Feb 28</p>
        <p className={styles.chartInfo}>Cannot Load Data</p>
      </div>
    );
  }

  console.log(getDate(7));

  const dates = [
    getDate(0),
    getDate(1),
    getDate(2),
    getDate(3),
    getDate(4),
    getDate(5),
    getDate(6),
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekData = dates.map((date) => {
    let day = "";
    const hours = logsData.logs
      .filter(
        (log) =>
          parseISO(log.date).toISOString() == parseISO(date).toISOString()
      )
      .reduce((acc, log) => acc + log.hours, 0);
    day = parseISO(date).getDay();
    return {
      x: daysShort[day],
      y: hours,
      day: days[day],
    };
  });

  const data = [
    {
      id: "week",
      data: weekData,
    },
  ];

  return (
    <div className={styles.RenderChart}>
      <h1 className={styles.chartHeader}>Daily Game Time</h1>
      <p className={styles.chartInfo}>Feb 22 - Feb 28</p>
      <ResponsiveLine
        data={data}
        theme={theme}
        margin={{ top: 50, right: 20, bottom: 200, left: 50 }}
        curve="natural"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Day",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Hours Played",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        pointSize={10}
        pointColor="#000"
        pointBorderColor="#77dd77"
        pointBorderWidth={2}
        useMesh={true}
        pointLabel="yFormatted"
        colors="#77dd77"
        tooltip={(obj) => {
          return (
            <div className={styles.tooltip}>
              {obj.point?.data?.y} hours played on {obj.point?.data?.day}
            </div>
          );
        }}
      />
    </div>
  );
};

export default RenderLineChart;
