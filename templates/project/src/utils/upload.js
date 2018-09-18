const CANCEL_CHOOSE_PICTRUE_TEXT = '已取消选择';
const LACK_OF_TOKEN_TEXT = 'You must have a correct token before upload';

export class ImgUploader {
  /**
   * 初始化
   * @param {Object} props 属性
   * @param {Object} token 上传凭证信息，包括access字符串和userId
   * @param {Array} sourceType album为从相机选择，camera为从相册选择
   * @param {String} uploadUrl 上传的URL
   * @param {Object} requestHeader 上传请求头
   * @param {Functino} getFileRequest 从文件中心获取单个文件信息
   */
  constructor(props) {
    const { token = {}, sourceType = ['camera'], uploadUrl, requestHeader = {}, getFileRequest } = props;
    this.sourceType = sourceType;
    this.token = token;
    this.uploadUrl = uploadUrl;
    this.requestHeader = requestHeader;
    this.getFileRequest = getFileRequest;
    this.name = 'pic';
  }
  // 更新Token
  updateToken(token = {}) {
    this.token = token;
  }
  /**
   * 发起上传过程
   * @param {Number} count 上传多少个
   * @return {Promise(Array)} 全部／部分成功上传，返回一个数组，上传成功的图片数据包含file和success字段，上传失败的图片数据包含fail字段和选择图片时的索引值
   * @return {Promise(Array)} 上传失败，返回的错误数据包括：upload_status上传状态，message错误信息
   */
  upload(count) {
    if (!this.token || !this.token.access) {
      return Promise.reject({ message: LACK_OF_TOKEN_TEXT, upload_status: 'fail' })
    }
    return this._choose(count)
      .then(picPaths => {
        // 按序构建一组Promise
        const uploadList = picPaths.map((path, i) => {
          // 先上传到文件中心
          return this._uploadFileToFileCenter(path)
            .then(res => {
              const { file_id } = res;
              // 成功则从文件中心获取数据
              return this._getFileInfoFromFileCenter({ file_id })
            })
            .catch((err) => ({ ...err, fail: true, index: i }))
        });
        return Promise.all(uploadList);
      });
  }
  /**
   * 选择图片
   */
  _choose(count) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count,
        sourceType: this.sourceType,
        success({ tempFilePaths } = {}) {
          resolve(tempFilePaths);
        },
        fail(err) {
          reject({ ...err, message: CANCEL_CHOOSE_PICTRUE_TEXT, upload_status: 'cancel' });
        }
      });
    });
  }
  /**
   * 上传文件到文件中心
   * @param {*} path 临时文件路径
   */
  _uploadFileToFileCenter(path) {
    const typeMap = {
      pic: 1,
      video: 2,
      audio: 3
    };
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: this.uploadUrl,
        method: 'POST',
        filePath: path,
        name: 'uploadFile',
        header: this.requestHeader,
        formData: {
          bizCheckUri: '/view/i/att/upload/check',
          type: typeMap[this.name],
          previewPic: 'true',
          publicAccess: 'false',
          file_type: 1,
          specifiedSiteId: 22,
          access: this.token.access,
          user_id: this.token.userId
        },
        // header: {}, // 设置请求的 header
        // formData: {}, // HTTP 请求中其他额外的 form data
        success(res) {
          const { results: { id } } = JSON.parse(res.data);
          resolve({ file_id: id });
        },
        fail(err) {
          reject(err);
        }
      })
    })
  }
  /**
   * 向文件中心获取文件信息
   * @param {*} param0
   */
  _getFileInfoFromFileCenter({ file_id }) {
    return this.getFileRequest({ file_id })
      .then(file => ({
        file,
        success: true
      }))
  }
}
