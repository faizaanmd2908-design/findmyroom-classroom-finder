var roomDetails = {
  "401": 40,
  "402": 45,
  "403": 50,
  "405": 60,
  "406": 65,
  "407": 70
};

var freeRoomsData = {
  1: {
    Wednesday: {
      3: ["401","402","405","406","407"],
      4: ["401","402","405","406","407"]
    },
    Thursday: {
      5: ["401","402","403","405","406","407"],
      6: ["401","402","403","405","406","407"]
    },
    Friday: {
      5: ["401","403","405","406","407"],
      6: ["401","403","405","406","407"]
    },
    Saturday: {
      5: ["401","402","403","405","406","407"],
      6: ["401","402","403","405","406","407"]
    }
  },
  2: {
    Monday: {
      7: ["401","402","403","405","406"],
      8: ["401","402","403","405","406"]
    },
    Wednesday: {
      7: ["401","402","405","406","407"],
      8: ["401","402","405","406","407"]
    },
    Thursday: {
      7: ["401","402","403","405","406","407"],
      8: ["401","402","403","405","406","407"]
    },
    Friday: {
      3: ["401","402","403","405","406","407"],
      4: ["401","402","403","405","406","407"]
    }
  },
  3: {
    Tuesday: {
      7: ["401","403","405","406","407"],
      8: ["401","403","405","406","407"]
    },
    Thursday: {
      5: ["401","402","403","405","406","407"],
      6: ["401","402","403","405","406","407"]
    },
    Friday: {
      3: ["401","402","403","405","406","407"],
      4: ["401","402","403","405","406","407"]
    },
    Saturday: {
      5: ["401","402","403","405","406","407"],
      6: ["401","402","403","405","406","407"]
    }
  },
  4: {
    Monday: {
      5: ["401","403","405","406"],
      6: ["401","403","405","406"]
    },
    Wednesday: {
      3: ["401","403","405","406","407"],
      4: ["401","403","405","406","407"]
    },
    Thursday: {
      3: ["401","403","406","407"],
      4: ["401","403","406","407"]
    },
    Friday: {
      7: ["401","402","405","406","407"],
      8: ["401","402","405","406","407"]
    }
  }
};

var cluster = document.getElementById("cluster");
var day = document.getElementById("day");
var hour = document.getElementById("hour");
var btn = document.getElementById("btnFind");
var result = document.getElementById("result");
var meta = document.getElementById("meta");

function getFreeRooms(clusterVal, dayVal, hourVal) {

  var rooms = [];

  if (
    freeRoomsData[clusterVal] &&
    freeRoomsData[clusterVal][dayVal] &&
    freeRoomsData[clusterVal][dayVal][hourVal]
  ) {
    rooms = freeRoomsData[clusterVal][dayVal][hourVal];
  }

  var topRooms = [];

  for (var i = 0; i < rooms.length && i < 3; i++) {
    var room = rooms[i];

    topRooms.push({
      room: room,
      capacity: roomDetails[room]
    });
  }

  return topRooms;
}

btn.onclick = function () {

  var clusterVal = cluster.value;
  var dayVal = day.value;
  var hourVal = hour.value;

  if (clusterVal === "" || dayVal === "" || hourVal === "") {
    result.innerHTML = "<p>Please select Cluster, Day and Hour.</p>";
    return;
  }

  var rooms = getFreeRooms(clusterVal, dayVal, hourVal);

  meta.innerHTML = "Cluster " + clusterVal + " • " + dayVal + " • Hour " + hourVal;

  if (rooms.length === 0) {
    result.innerHTML = "<p>No free classrooms found.</p>";
    return;
  }

  var table = "<table class='table'>";
  table += "<tr><th>Free Classroom</th><th>Capacity</th></tr>";

  for (var i = 0; i < rooms.length; i++) {
    table += "<tr>";
    table += "<td>" + rooms[i].room + "</td>";
    table += "<td>" + rooms[i].capacity + " students</td>";
    table += "</tr>";
  }

  table += "</table>";

  result.innerHTML = table;
};