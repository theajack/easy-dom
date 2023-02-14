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
  'title'| 'var';

export interface IJson<T=string> {
  [prop: string]: T
}

export type TEvent =
  'click'| 'mousedown'| 'mouseenter'| 'mouseleave'| 'mousemove'| 'mouseover'| 'mouseup'|
  'touchend'| 'touchmove'| 'touchstart'| 'wheel'| 'input'| 'change' |
  'fullscreenchange' | 'fullscreenerror' | 'copy' | 'cut' | 'paste' | 'abort' | 'auxclick' |
  'beforeinput' | 'blur' | 'canplay' | 'canplaythrough' | 'close' |
  'compositionend' | 'compositionstart' | 'compositionupdate' | 'contextmenu' |
  'cuechange' | 'dblclick' | 'drag' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' |
  'dragstart' | 'drop' | 'durationchange' | 'emptied' | 'ended' | 'error' | 'focus' | 'focusin' |
  'focusout' | 'formdata' | 'gotpointercapture' | 'invalid' | 'keydown' | 'keypress' |
  'keyup' | 'load' | 'loadeddata' | 'loadedmetadata' | 'loadstart' | 'lostpointercapture' |
  'mouseout' | 'pause' | 'play' | 'playing' | 'pointercancel' | 'pointerdown' | 'pointerenter' | 'pointerleave' |
  'pointermove' | 'pointerout' | 'pointerover' | 'pointerup' | 'progress' | 'ratechange' | 'reset' |
  'resize' | 'scroll' | 'select' | 'selectionchange' | 'selectstart' | 'submit' | 'suspend' | 'timeupdate' |
  'toggle' | 'touchcancel';
