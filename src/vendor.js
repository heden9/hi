/* eslint-disable */
import React from 'react';
import io from 'socket.io-client';
import lodash from 'lodash';
import iscroll from 'iscroll';
import moment from 'moment';
import createLoading from 'dva-loading';
import { Map } from 'react-amap';
import classnames from 'classnames';
import { createForm } from 'rc-form';
import ReactDOM from 'react-dom';
import dva, { connect } from 'dva';
import router from 'dva/router';
import saga from 'dva/saga';
import antdM from 'antd-mobile';
const { Button, Toast, Modal, TextareaItem, Badge, ListView, Carousel, Icon, ActivityIndicator, List, ImagePicker, InputItem } = antdM;
const { Router, Route, Switch, Redirect } = router;
