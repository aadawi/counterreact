import React, { ReactDOM, mountNode } from "react";
import { AlertList } from "react-bs-notifier";

class NotifierGenerator extends React.Component {
  onAlertDismissed(alert) {
    const alerts = this.state.alerts;

    // find the index of the alert that was dismissed
    const idx = alerts.indexOf(alert);

    if (idx >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      });
    }
  }

  render() {
    return (
      <div>
        <AlertList
          position="top-right"
          alerts={this.props.alerts}
          timeout={3000}
          dismissTitle="Begone!"
          onDismiss={this.props.onAlertDismissed.bind(this)}
        />
      </div>
    );
  }
}

export default NotifierGenerator;
