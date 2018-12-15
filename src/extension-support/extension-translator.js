  const translate = (extensionInfo, translationMap) => {
    const info = Object.assign({}, extensionInfo);
    const keys = Object.keys(translationMap);
    // translate blocks
    info.blocks.forEach((block) => {
      keys.forEach((key) => {
        if (block.opcode === key) {
          block.text = translationMap[key];
        }
      });
    });
    const menusTranslationList = keys
      .map((key) => {
        const menusInfo = key.split('_');
        if (menusInfo.length !== 2) {
          return null;
        }
        return {
          key: menusInfo[0],
          value: menusInfo[1],
          text: translationMap[key],
        };
      })
      .filter((menu) => menu !== null);
    const menus = info.menus;
    Object
      .keys(menus)
      .forEach((menuKey) => {
        const menu = menus[menuKey];
        menusTranslationList.forEach((translateSet) => {
          menu.forEach((item) => {
            if (menuKey === translateSet.key && translateSet.value === item.value) {
              item.text = translateSet.text;
            }
          });
        });
      });
  };

const maybeTranslate = (info, locale) => {
    if (info.translation_map) {
        const translation = info.translation_map[locale]
        if (translation) {
            return translate(info, translation);
        }
    }
    return info;
};

module.exports = maybeTranslate;
