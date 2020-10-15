module.exports = {
  title: '智慧校园后台管理',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  // showSettings: true,
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  // tagsView: true,
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  // fixedHeader: false,
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  // sidebarLogo: false,
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description Whether support pinyin search in headerSearch
   * Bundle size minified 47.3kb,minified + gzipped 63kb
   */
  supportPinyinSearch: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
