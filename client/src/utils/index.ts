
export function getInitials(fullName) {
    const names = fullName.split(" ");
  
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials.join("");
  
    return initialsStr;
  }



  export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);
  
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }
  
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }


  export const formatDate = (date,hours) => {
    // Get the month, day, and year
    const dateOjb = new Date(date)
    const month = dateOjb.toLocaleString("en-US", { month: "short" });
    const day = dateOjb.getDate();
    const year = dateOjb.getFullYear();
    const hour = dateOjb.getHours();
    const minutes = dateOjb.getMinutes();
  if(hours){
    return `${day}-${month}-${year}, ${hour}:${minutes>10? minutes : "0"+minutes}`;
  }
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  };
  



  export const PRIOTITYSTYELS={
    high:"text-red-700",
    medium:"text-yellow-700",
    low:"text-blue-600",
  };

  export const TASK_TYPE = {
    todo: "bg-blue-600",
    "in progress": "bg-yellow-600",
    completed: "bg-green-600",
  };
  
  export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];