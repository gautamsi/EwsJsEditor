import { Aurelia } from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then((a) => {
    let root = a.host.getAttribute("root");
    aurelia.setRoot("views/" + (root || "app"));
  }
  );
}