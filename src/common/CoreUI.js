import React, { Component } from 'react';
import {
  Modal,
  notification,
} from "antd";
import { NotificationKeys } from "./utils/keys";
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { PublicModules } from './PublicModules';

const { confirm } = Modal;

export class CoreUI {
  static _showConfirm = ({
    title = "Are you sure ?",
    message = "Message confirm",
  }) => {
    return new Promise((resole, reject) => {
      confirm({
        title: title,
        icon: <QuestionCircleOutlined />,
        content: message,
        onOk() {
          resole('OK');
        },
        onCancel() {
          reject('Cancel');
        },
      });
    });
  }

  static fun_showConfirm = async ({
    title = "Are you sure ?",
    message = "Message confirm",
  }) => {
    let ok = true;
    await CoreUI._showConfirm({
      title: title,
      message: message,
    })
      .catch((_e) => {
        ok = false;
      });
    return ok;
  };

  static fun_showNotification = ({
    placement = 'topRight',
    title = null,
    message = 'Message Notification',
    type = NotificationKeys.INFO,
  }) => {
    const key = PublicModules.fun_getTimeStamp();
    switch (type) {
      case NotificationKeys.INFO: {
        notification.info({
          key: key,
          message: title || 'Info!',
          description: message,
          placement,
        });
        break;
      }
      case NotificationKeys.SUCCESS: {
        notification.success({
          key: key,
          message: title || 'Successfully!',
          description: message,
          placement,
        });
        break;
      }
      case NotificationKeys.WARM: {
        notification.warn({
          key: key,
          message: title || 'Warn!',
          description: message,
          placement,
        });
        break;
      }
      case NotificationKeys.WARNING: {
        notification.warning({
          key: key,
          message: title || 'Warning!',
          description: message,
          placement,
        });
        break;
      }
      case NotificationKeys.ERROR: {
        notification.error({
          key: key,
          message: title || 'Error!',
          description: message,
          placement,
        });
        break;
      }
      case NotificationKeys.LOADING: {
        notification.info({
          key: key,
          message: <LoadingRaw message={message} />,
          placement,
          duration: 60,
        });
        break;
      }

      default: {
        notification.info({
          key: key,
          message: title || 'Info!',
          description: message,
          placement,
        });
        break;
      }
    }

    return key;
  }

  static fun_closeNotificationLoading = (keyLoading) => {
    notification.close(keyLoading);
  }
}


class LoadingRaw extends Component {
  render() {
    return (
      <div className="w-100 text-center m-0 p-0">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-primary text-uppercase fw-bold m-0 p-0 mt-2">
          {this.props.message}
        </p>
      </div>
    );
  }
}