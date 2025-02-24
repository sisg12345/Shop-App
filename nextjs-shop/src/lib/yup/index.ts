import * as yup from 'yup'
import * as ja from 'yup-locale-ja'

/**
 * jaローケルを設定
 *  descriptive (記述的): ex) ~です
 *  suggestive (提示的): ex)~してくださいｓ
 */
yup.setLocale(ja.descriptive)

export default yup
