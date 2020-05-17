export interface IClassDetails {
  availableSeats: string;
  classNumber: string;
  combinedSectionCap: string;
  dates: string;
  description: string;
  enrollmentTotal: string;
  location: string;
  notes?: string;
  status: string;
  units: string;
  waitListCap: string;
  waitListTotal: string;
}

export interface ClassDetailsCalendar {
  classNumber: number;
  code: string;
  dates: string;
  professor: {
    details: {
      averageRating: string;
      firstName: string;
      lastName: string;
      pkId: string;
    };
    name: string;
  };
  room: string;
  section: string;
  status: "OPEN" | "CLOSED" | "WAITLIST";
  time: string;
}

export interface ClassSection {
  cell: {
    index: number;
    totalSize: number;
  };
  className: string;
  code: string;
  color: string;
  location: string;
  time: string;
}

export interface SearchOptions {
  career: string;
  location: string;
  showOpenClassesOnly: boolean;
  subject: string;
  term: string;
}
