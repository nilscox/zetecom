import * as AuthenticationFormDemos from './domain/AuthenticationForm/AuthenticationForm.demo';
import * as CommentDemos from './domain/Comment/Comment.demo';
import * as CommentFormDemos from './domain/CommentForm/CommentForm.demo';
import * as CommentsAreaDemos from './domain/CommentsArea/CommentsArea.demo';
import * as CommentsAreaOutlineDemos from './domain/CommentsAreaOutline/CommentsAreaOutline.demo';
import * as FooterDemos from './domain/Footer/Footer.demo';
import * as HeaderDemos from './domain/Header/Header.demo';
import * as NotificationDemos from './domain/Notification/Notification.demo';
import * as UserMenuDemos from './domain/UserMenu/UserMenu.demo';
//
import * as AvatarDemos from './elements/Avatar/Avatar.demo';
import * as ButtonDemos from './elements/Button/Button.demo';
import * as DiffDemos from './elements/Diff/Diff.demo';
import * as FiltersBarDemos from './elements/FiltersBar/FiltersBar.demo';
import * as IconButtonDemos from './elements/IconButton/IconButton.demo';
import * as InputDemos from './elements/Input/Input.demo';
import * as MarkdownDemos from './elements/Markdown/Markdown.demo';
import * as MenuDemos from './elements/Menu/Menu.demo';
import * as NotificationContainerDemos from './elements/NotificationContainer/NotificationContainer.demo';
import * as TabsDemos from './elements/Tabs/Tabs.demo';
import * as TextDemos from './elements/Text/Text.demo';
//
import * as IconsDemos from './icons/demos';
//
import * as AsyncDemos from './layout/Async/Async.demo';
import * as CollapseDemos from './layout/Collapse/Collapse.demo';
import * as FallbackDemos from './layout/Fallback/Fallback.demo';
import * as NestedDemos from './layout/Nested/Nested.demo';

export const componentsDemos = {
  domain: {
    Comment: CommentDemos,
    CommentForm: CommentFormDemos,
    CommentsAreaOutline: CommentsAreaOutlineDemos,
    CommentsArea: CommentsAreaDemos,
    AuthenticationForm: AuthenticationFormDemos,
    UserMenu: UserMenuDemos,
    Notification: NotificationDemos,
    Header: HeaderDemos,
    Footer: FooterDemos,
  },
  elements: {
    Text: TextDemos,
    Button: ButtonDemos,
    IconButton: IconButtonDemos,
    Input: InputDemos,
    Avatar: AvatarDemos,
    Tabs: TabsDemos,
    Menu: MenuDemos,
    FiltersBar: FiltersBarDemos,
    Markdown: MarkdownDemos,
    Diff: DiffDemos,
    Notifications: NotificationContainerDemos,
  },
  layout: {
    Collapse: CollapseDemos,
    Nested: NestedDemos,
    Async: AsyncDemos,
    Fallback: FallbackDemos,
  },
  icons: {
    'All icons': IconsDemos,
  },
};
