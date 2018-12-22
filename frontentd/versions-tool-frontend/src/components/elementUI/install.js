import Vue from 'vue';
import {
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Icon,
  Row,
  Col,
  Card,
  Container,
  Header,
  Main,
  Loading,
  Notification,
  Scrollbar,
  Menu,
  MenuItem,
} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Scrollbar);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
