(function() {
  let mX,
    mY,
    distance,
    angle,
    $anglePointer = $("#angle-pointer"),
    $readout = $("#readout"),
    $distanceReadout = $("#distance-readout"),
    $angleReadout = $("#angle-readout"),
    $positionReadout = $("#mouse-xy"),
    $follower = $("#follower");

  let readoutX = $readout.offset().left + $readout.width() / 2;
  let readoutY = $readout.offset().top + $readout.height() / 2;

  const calculateDistance = (elem, mouseX, mouseY) => {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
          Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)
      )
    );
  };

  const calcuateAngle = (cx, cy, ex, ey) => {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return Math.floor(theta);
  };

  const changeReadoutColor = distance => {
    if (distance < 100) {
      $readout[0].style.backgroundColor = "red";
    } else if (distance < 200) {
      $readout[0].style.backgroundColor = "yellow";
    } else if (distance < 400) {
      $readout[0].style.backgroundColor = "green";
    } else {
      $readout[0].style.backgroundColor = "";
    }
  };

  const changeAnglePointer = angle => {
    $anglePointer[0].style.transform = `rotate(${angle}deg)`;
  };

  const moveFollower = (elem, mouseX, mouseY) => {
    const followerX = mouseX - elem.width() / 2;
    const followerY = mouseY - elem.height() / 2;
    $follower[0].style.top = `${followerY}px`;
    $follower[0].style.left = `${followerX}px`;
    // console.dir($follower[0]);
    // $follower[0].style.transform = `translate(${mouseX} ${mouseY})`;
  };

  $(document).mousemove(function(e) {
    distance = calculateDistance($readout, e.pageX, e.pageY);
    angle = calcuateAngle(readoutX, readoutY, e.pageX, e.pageY);
    $distanceReadout.text(`Distance: ${distance}px`);
    $angleReadout.text(`Angle: ${angle}deg`);
    $positionReadout.text(`MouseX: ${e.pageX}, MouseY: ${e.pageY}`);
    changeReadoutColor(distance);
    changeAnglePointer(angle);
    moveFollower($follower, e.pageX, e.pageY);
  });
})();
