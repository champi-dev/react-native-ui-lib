import _ from 'lodash';
import {Constants} from '../../helpers';


export function getChildrenLength(props) {
  const length = _.get(props, 'children.length') || 0;
  return length;
}

export function calcOffset(props, state) {
  const {currentPage, pageWidth} = state;
  const {loop} = props;

  const actualCurrentPage = loop ? currentPage + 1 : currentPage;

  let offset = pageWidth * actualCurrentPage;
  offset = getDirectionOffset(offset, props);

  return offset;
}

export function getDirectionOffset(offset, props, pageWidth) {
  let fixedOffset = offset;

  if (Constants.isRTL && Constants.isAndroid) {
    const {loop} = props;
    const totalWidth = ((getChildrenLength(props) - 1) + (loop ? 2 : 0)) * pageWidth;
    fixedOffset = Math.abs(totalWidth - offset);
  }

  return fixedOffset;
}

export function calcPageIndex(offset, props, pageWidth) {
  const pagesCount = getChildrenLength(props);
  const {loop} = props;
  const pageIndexIncludingClonedPages = Math.round(offset / pageWidth);

  let actualPageIndex;
  if (loop) {
    actualPageIndex = (pageIndexIncludingClonedPages + (pagesCount - 1)) % pagesCount;
  } else {
    actualPageIndex = Math.min(pagesCount - 1, pageIndexIncludingClonedPages);
  }

  return actualPageIndex;
}

export function isOutOfBounds(offset, props, pageWidth) {
  const length = getChildrenLength(props);
  const minLimit = 1;
  const maxLimit = ((length + 1) * pageWidth) - 1;

  return !_.inRange(offset, minLimit, maxLimit);
}

// TODO: need to support more cases of page width in loop mode
export function calcCarouselWidth(props) {
  const {pageWidth, loop} = props;
  let length = getChildrenLength(props);
  length = loop ? length + 2 : length;
  return pageWidth * length;
}
