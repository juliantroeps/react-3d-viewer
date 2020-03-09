export default function Tick(fuc, name) {
    let Renderer = {animate: true, name: ''};

    let elements = [
        Object.assign(Object.create(Renderer), {fuc, name})
    ];

    const animate = () => {
        requestAnimationFrame(animate);
        elements.forEach(o => {
            const {fuc, animate} = o;
            if (animate) {
                fuc.call(o, Date.now())
            }
        });
    };

    animate();

    Tick = (fuc, name) => {
        let o = Object.assign(Object.create(Renderer), {fuc, name})
        elements.push(o);
        return o
    };

    return elements[0]
}
