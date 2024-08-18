import { init } from "snabbdom/init";
import { classModule } from "snabbdom/modules/class";
import { propsModule } from "snabbdom/modules/props";
import { styleModule } from "snabbdom/modules/style";
import { eventListenersModule } from "snabbdom/modules/eventlisteners";
import { h } from "snabbdom/h";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const virtualNode1 = h(
  "a",
  {
    props: {
      href: "https://www.baidu.com",
      target: "_blank",
    },
  },
  "Hello World"
);
console.log(virtualNode1);

const container = document.getElementById("container");

patch(container, virtualNode1);
