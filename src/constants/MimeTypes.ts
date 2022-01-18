/*
 *
 * ENUM for standard MimeTypes
 *
 */
export enum MimeType {
    /*
     *
     * Application Mime Types
     *
     */
  
    JSON = "application/json",
    XML = "application/xml",
    JAR = "application/java-archive",
    X12 = "application/EDI-X12",
    EDIFACT = "application/EDIFACT",
    JAVASCRIPT = "application/javascript",
    OCTET_STREAM = "application/octet-stream",
    OGG = "application/ogg",
    PDF = "application/pdf",
    XHTML = "application/xhtml+xml",
    FLASH = "application/x-shockwave-flash",
    LD_JSON = "application/ld+json",
    ZIP = "application/zip",
    URL_ENCODED = "application/x-www-form-urlencoded",
  
    /*
     *
     * Audio Mime Types
     *
     */
  
    MPEG = "audio/mpeg",
    WMA = "audio/x-ms-wma",
    REAL_AUDIO = "audio/vnd.rn-realaudio",
    WAV = "audio/x-wav",
  
    /*
     *
     * Image Mime Types
     *
     */
  
    GIF = "image/gif",
    JPEG = "image/jpeg",
    PNG = "image/png",
    TIFF = "image/tiff",
    ICON_MICROSOFT = "image/vnd.microsoft.icon",
    X_ICON = "image/x-icon",
    DJVU = "image/vnd.djvu",
    SVG = "image/svg+xml",
  
    /*
     *
     * Multipart Mime Types
     *
     */
  
    MULTI_MIXED = "multipart/mixed",
    MULTI_ALTERNATIVE = "multipart/alternative",
    MULTI_RELATED = "multipart/related", //using by MHTML (HTML mail).
    FORM_DATA = "multipart/form-data",
  
    /*
     *
     * Text Mime Types
     *
     */
  
    CSS = "text/css",
    CSV = "text/csv",
    HTML = "text/html",
    PLAIN_TEXT = "text/plain",
    XML_TEXT = "text/xml",
  
    /*
     *
     * Video Mime Types
     *
     */
  
    MPEG_VIDEO = "video/mpeg",
    MP4 = "video/mp4",
    QUICK_TIME = "video/quicktime",
    MS_WMV = "video/x-ms-wmv",
    MS_VIDEO = "video/x-msvideo",
    FLV = "video/x-flv",
    WEBM = "video/webm",
  
    /*
     *
     * Application VND Mime Types
     *
     */
  
    VND_APK = "application/vnd.android.package-archive",
    VND_OPENDOC_TEXT = "application/vnd.oasis.opendocument.text",
    VND_OPENDOC_SPREADSHEET = "application/vnd.oasis.opendocument.spreadsheet",
    VND_OPENDOC_PRESENTATION = "application/vnd.oasis.opendocument.presentation",
    VND_OPENDOC_GRAPHICS = "application/vnd.oasis.opendocument.graphics",
    VND_MS_EXCEL = "application/vnd.ms-excel",
    VND_OPENXMLFORMAT_SPREADSHEET = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    VND_MS_POWERPOINT = "application/vnd.ms-powerpoint",
    VND_OPENXMLFORMAT_PRESENTATION = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    VND_MS_WORD = "application/msword",
    VND_OPENXMLFORMAT_WORD = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    VND_MOZILLA_XUL_XML = "application/vnd.mozilla.xul+xml"
  }
  