const CELL_HEIGHT_PX = 60;

export const computeTopAndBottom = (classSectionTime: string) => {
  //Convert "11:30AM - 2:20PM" into ["11:30 AM", "2:20 PM"]
  const time: string[] = classSectionTime.split(" - ");

  //Convert "11:30 AM" into ["11", "30AM"]
  const startTime: string[] = time[0].split(":");

  //Convert ["2:20 PM"] into ["2", "20PM"]
  const endTime: string[] = time[1].split(":");

  //Returns 11
  const startHour: number = parseInt(startTime[0], 10);

  //Returns 30
  const startMinute: number = parseInt(startTime[1], 10);

  //If the start hour (11) is greater than the end hour (2), then we need to add 12 to the end hour (2 + 12 = 14) so that the UI can render the class properly
  const tempEndHour = parseInt(endTime[0], 10);
  const endHour = startHour > tempEndHour ? tempEndHour + 12 : tempEndHour;

  //Returns 20
  const endMinute = parseInt(endTime[1], 10);

  const minuteDiff =
    (endHour * 60 + endMinute - (startHour * 60 + startMinute)) / 60;

  const top = (startMinute / 60) * CELL_HEIGHT_PX;

  let bottom = minuteDiff * CELL_HEIGHT_PX + top - CELL_HEIGHT_PX; //570 - 420 = 150

  bottom = minuteDiff > 60 ? 1 * Math.floor(minuteDiff) * -1 : bottom * -1;

  return {
    bottom,
    top
  };
};
