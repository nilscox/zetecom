import * as CommentHistoryDemos from './CommentHistoryView/CommentHistory.demo';
import * as ExtensionPopupDemos from './ExtensionPopupView/ExtensionPopup.demo';
import * as IntegrationDemos from './IntegrationView/Integration.demo';
import * as ReportCommentDemos from './ReportCommentView/ReportComment.demo';

export const viewsDemos = {
  extension: {
    integration: IntegrationDemos,
    popup: ExtensionPopupDemos,
  },
  popups: {
    CommentHistory: CommentHistoryDemos,
    ReportComment: ReportCommentDemos,
  },
};
