import { memo, useCallback, useEffect, useState } from "react";

import { getSunriseSunset } from "@/api";
import { ICON_CLOUD, ICON_MOON, ICON_SUN } from "@/constants";

type SunTimesProps = {
  coords: Coordinates | null;
  dateTime: string;
};

export const SunTimes: React.FC<SunTimesProps> = memo(
  ({ coords, dateTime }) => {
    const [iconName, setIconName] = useState<IconName>(ICON_CLOUD);

    const fetchSunTimes = useCallback(async () => {
      if (!coords) return;

      const dateFormatted = dateTime.split(" ")[0].replace(/\./g, "");

      const sunTimes = await getSunriseSunset(
        dateFormatted,
        coords.latitude,
        coords.longitude
      );

      if (sunTimes) {
        const currentTime = dateTime.split(" ")[1].replace(":", "");

        const sunriseTime = sunTimes.sunrise.trim();
        const sunsetTime = sunTimes.sunset.trim();

        const isDayTime =
          currentTime >= sunriseTime && currentTime <= sunsetTime;
        const icon = isDayTime ? ICON_SUN : ICON_MOON;
        setIconName(icon);
      }
    }, [coords, dateTime]);

    useEffect(() => {
      fetchSunTimes();
    }, [coords, dateTime]);

    if (!coords) {
      return <button className="button is-ghost is-loading px-14-5" />;
    }

    return (
      <img
        className="mr-2"
        src={`${iconName}.svg`}
        width={22}
        height={22}
        alt="day_image"
      />
    );
  }
);
