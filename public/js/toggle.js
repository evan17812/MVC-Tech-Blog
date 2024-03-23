function viewpost(i) {

    var element = document.getElementById(`post${i}`);

    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }