function createOneSlidePerRow() {

  // Replace <INSERT_SLIDE_DECK_ID> wih the ID of your 
  // Google Slides presentation.
  let masterDeckID = "{YOUR_SLIDE_ID_CAN_BE_FOUND_FROM_URL}";

  // Open the presentation and get the slides in it.
  let deck = SlidesApp.openById(masterDeckID);
  let slides = deck.getSlides();

  // The 1st slide is the template that will be duplicated.
  let masterSlide = slides[1];

  let playerNames = ["ayk1117", "二胡", "洲了个汀", "SpeakableNet", "鸭", "iKun", "FinalMasterSparkTom", "MarkTheWitty"];

  // Split this into 4 batches, because AppScript has a 6 min timeout (unless you pay for preminium..)
  // NOTE: that means we need to run this script 4 times!
  let operatorNames1 = ["能天使", "空弦", "灰烬", "黑", "鸿雪", "远牙", "W", "菲亚梅塔", "早露", "提丰", "迷迭香", "假日威龙陈", "推进之王", "风笛", "嵯峨", "琴柳", "焰尾", "伺夜", "缪尔赛思", "伊内丝", "伊芙利特"];
  let operatorNames2 = ["莫斯提马", "艾雅法拉", "刻俄柏", "霍尔海雅", "夕", "异客", "卡涅利安", "林", "澄闪", "黑键", "灵知", "安洁莉娜", "铃兰", "麦哲伦", "浊心斯卡蒂", "淬羽赫默", "令", "白铁", "塑心", "傀影"];
  let operatorNames3 = ["缄默德克萨斯", "麒麟R夜刀", "老鲤", "琳琅诗怀雅", "温蒂", "阿", "歌蕾蒂娅", "水月", "归溟幽灵鲨", "多萝西", "闪灵", "夜莺", "凯尔希", "流明", "纯烬艾雅法拉", "焰影苇草", "星熊", "塞雷娅"];
  let operatorNames4 = ["瑕光", "年", "泥岩", "斥罪", "森蚺", "号角", "涤火杰西卡", "山", "重岳", "银灰", "棘刺", "仇白", "赫德雷", "陈", "艾丽妮", "煌", "百炼嘉维尔", "史尔特尔", "薇薇安娜", "赫拉格", "帕拉斯", "耀骑士临光", "止颂", "圣约送葬人", "玛恩纳", "斯卡蒂"];

  // Change the list name here in every batch.
  let currentRunningList = operatorNames4;

  let player2operators = {}
  playerNames.forEach(function (playerName) {
    let folder = DriveApp.getFoldersByName(playerName).next();
    let fileIterator = folder.getFiles();
    let images = {}
    while (fileIterator.hasNext()) {
      var file = fileIterator.next();
      images[file.getName()] = file;
    }
    player2operators[playerName] = images;
  });

  currentRunningList.reverse().forEach(function (operatorName) {

    // Insert a new slide by duplicating the master slide.
    let slide = masterSlide.duplicate();
    let images = slide.getImages();

    for (var i = 0; i < playerNames.length; i++) {
      pTemplate = "{{p" + (i + 1) + "}}";
      slide.replaceAllText(pTemplate, playerNames[i]);

      let originalImage = images[i];
      let operatorImageFile = player2operators[playerNames[i]][operatorName + '.jpg'];
      if (operatorImageFile == null) {
        continue;
      }

      // slide.insertImage(operatorImageFile, originalImage.getLeft(), originalImage.getTop(), originalImage.getWidth(), originalImage.getHeight());
      // originalImage.remove();
      originalImage.replace(operatorImageFile);
    }
  });
}

function clear() {

  // Replace <INSERT_SLIDE_DECK_ID> wih the ID of your 
  // Google Slides presentation.
  let masterDeckID = "1BnNShfyl_Uf_vHm7lMFIKzP3OJInhV2qxV689kFMETA";

  // Open the presentation and get the slides in it.
  let deck = SlidesApp.openById(masterDeckID);
  let slides = deck.getSlides();

  while (slides.length > 2) {
    let slide = slides.pop();
    slide.remove();
  }
}
