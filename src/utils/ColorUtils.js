export const lightenRGB = (rgb, factor) => {
    // Разбиваем строку rgb на компоненты
    let [r, g, b] = rgb.match(/\d+/g).map(Number);

    // Увеличиваем каждую компоненту на заданный фактор, но не превышаем 255
    r = Math.min(255, r + factor);
    g = Math.min(255, g + factor);
    b = Math.min(255, b + factor);

    return `rgb(${r}, ${g}, ${b})`;
}
