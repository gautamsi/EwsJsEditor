import { Aurelia } from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('browser/resources')
    .developmentLogging()
    //.plugin('aurelia-plugins-tabs')
    .plugin('aurelia-kendoui-bridge')

  // if (environment.debug) {
  //   aurelia.use.developmentLogging();
  // }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then((a) => {
    let root = a.host.getAttribute("root");
    aurelia.setRoot("browser/" + (root || "app"));
  }
  );
}
