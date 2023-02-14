/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 09:03:47
 * @Description: Coding something
 */
export interface ISize {width: number; height: number}

export type TTag =
  'a'| 'div'| 'h1'| 'h2'| 'h3'| 'h4'| 'h5'| 'h6'| 'button'| 'canvas'| 'code'| 'pre'| 'table'| 'th'| 'td'| 'tr'| 'video'| 'audio' |
  'ol'| 'select'| 'option'| 'p'| 'i'| 'iframe'| 'img'| 'input'| 'label'| 'ul'| 'li'| 'span'| 'textarea'| 'form'| 'br'| 'tbody' |
  'abbr'| 'article'| 'aside'| 'b'| 'base'| 'bdi'| 'bdo'| 'blockquote'| 'caption'| 'cite'| 'del'| 'details'| 'dialog' |
  'em'| 'embed'| 'figure'| 'footer'| 'header'| 'hr'| 'menu'| 'nav'| 'noscript' |
  'object'| 'progress'| 'section'| 'slot'| 'small'| 'strong'| 'sub'| 'summary'| 'sup'| 'template' |
  'title'| 'var' |
  'style' | 'meta' | 'head' | 'link' & string;

export interface IJson<T=any> {
  [prop: string]: T
}
