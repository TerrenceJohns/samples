const TabletOrientation = {
    portrait:1,
    landscape:2,
  };
  var tabletView = false;
  var tabletOrientation = 1; 
  function setDeviceZoom(){
    var zoomLevel = $("#cbZoom").val();
    $("#mainContainer").children().css('zoom', zoomLevel);
  }
  
  function setApplicationTitle(title,short){
    $(".appNavbar").children().children(".navbar-brand").html(title);
    $(".tabletNavbar").children().children(".navbar-brand").html(short);
   
  }
  function closeapp() {
    window.closeApp();
  }

  function toggleOrientation(){
    if(tabletOrientation==TabletOrientation.portrait) {
      simulateTablet(true);
    } else {
      simulateTablet(false);
    }
  };
  function startSimulation(landscape){
    $("#mySidebar").css('width', '0px');
    $("#mainDiv").css('margin-left', '0px');
    setTimeout(simulateTablet,500,landscape);
  }
  function simulateTablet(landscape) {
    
    $("#mainContainer").addClass('mobileContainer');
    $(".mobileController").css('display','');
    $(".appNavbar").css('display', 'none');
    $(".tabletNavbar").css('display', '');
    if (landscape) {
      $("#mainContainer").removeClass('portrait');
      $("#mainContainer").addClass('landscape');
      $("#btnOrientation").html("Change to <b>Portrait</b>");
      window.renderMobile(true);
      tabletOrientation = TabletOrientation.landscape;
    } else {
      $("#mainContainer").removeClass('landscape');
      $("#mainContainer").addClass('portrait');
      $("#btnOrientation").html("Change to <b>Landscape</b>");
      window.renderMobile(false);
      tabletOrientation = TabletOrientation.portrait;
    }
    tabletView = true;
  }

  function stopTabletSimulation() {
    window.reset();
    $("#mainContainer").removeClass('mobileContainer');
    $(".mobileController").css('display','none');
    $(".appNavbar").css('display', '');
    $(".tabletNavbar").css('display', 'none');
    $("#mainContainer").children().css('zoom', 1);
    $("#cbZoom").val('100%');
    tabletView = false;

    
  }

  function toggleSideBar() {
    var w = $("#mySidebar").css('width');
    if (!tabletView) {
      if (w == '250px') {
        $("#mySidebar").css('width', '0px');
        $("#mainDiv").css('margin-left', '0px');
      } else {
        $("#mySidebar").css('width', '250px');
        $("#mainDiv").css('margin-left', '250px');
        
      }
    } else {
      stopTabletSimulation();
      tabletView = false;
    }

  }
