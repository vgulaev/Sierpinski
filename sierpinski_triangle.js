class Sierpinski {
  constructor() {
    this.root = document.getElementById('main');
    let w = Math.floor(window.innerWidth * 0.95);
    let h = Math.floor(window.innerHeight * 0.95);
    this.w = w;
    this.h = h;
    this.root.setAttributeNS(null, 'width', w + 'px');
    this.root.setAttributeNS(null, 'height', h + 'px');
    let r = document.getElementById('rect');
    r.setAttributeNS(null, 'x', 0);
    r.setAttributeNS(null, 'y', 0);
    r.setAttributeNS(null, 'width', w);
    r.setAttributeNS(null, 'height', h);

    let m = Math.floor(Math.min(w, h) * 0.02);
    this.tr = [[m, h - m], [w - m, h - m], [w / 2, m]];
    console.log(this.tr);

    let l1 = document.getElementById('l1');
    l1.setAttributeNS(null, 'x1', this.tr[0][0]);
    l1.setAttributeNS(null, 'y1', this.tr[0][1]);
    l1.setAttributeNS(null, 'x2', this.tr[1][0]);
    l1.setAttributeNS(null, 'y2', this.tr[1][1]);

    let l2 = document.getElementById('l2');
    l2.setAttributeNS(null, 'x1', this.tr[1][0]);
    l2.setAttributeNS(null, 'y1', this.tr[1][1]);
    l2.setAttributeNS(null, 'x2', this.tr[2][0]);
    l2.setAttributeNS(null, 'y2', this.tr[2][1]);

    let l3 = document.getElementById('l3');
    l3.setAttributeNS(null, 'x1', this.tr[2][0]);
    l3.setAttributeNS(null, 'y1', this.tr[2][1]);
    l3.setAttributeNS(null, 'x2', this.tr[0][0]);
    l3.setAttributeNS(null, 'y2', this.tr[0][1]);
  }

  static get xmlns() {
    return "http://www.w3.org/2000/svg";
  }

  static createSVG(tag) {
    return document.createElementNS(Sierpinski.xmlns, tag);
  }

  random_point() {
    let i = Math.floor(Math.random() * 3);
    return this.tr[i];
  }

  create_point(x, y) {
    let point = Sierpinski.createSVG('circle');
    point.setAttributeNS (null, 'cx', x);
    point.setAttributeNS (null, 'cy', y);
    point.setAttributeNS (null, 'r', 0.5);

    return point;
  }

  first_point() {
    this.create_point(150, 150);
  }

  next_point(d) {
    s.time_stamp = performance.now();
    for (let i = 0; i < d; i++) {
      let p = s.random_point();
      s.root.append(s.create_point(s.x, s.y));
      s.x = Math.floor((s.x + p[0]) / 2 * 10) / 10;
      s.y = Math.floor((s.y + p[1]) / 2 * 10) / 10;
    }
    s.point_count += d;
    if (s.point_count < 60000) {
      requestAnimationFrame(() => {
        let d = Math.floor((performance.now() - s.time_stamp) / s.duration * s.total);
        s.next_point(d);
      });
    }
  }

  animation(x, y) {
    this.x = x;
    this.y = y;
    this.delay = 100;
    this.point_count = 0;
    this.total = 60000;
    this.time_stamp = 0;
    this.duration = 10000;
    s.next_point(1);
  }
}

window.addEventListener("load", function( event ) {
  requestAnimationFrame(() => {
    s = new Sierpinski();
    s.animation(s.w / 2, s.h / 2);
  });
});
