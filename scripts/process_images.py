from PIL import Image
import os


def remove_light_bg(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    bg_r = sum(c[0] for c in corners) / 4
    bg_g = sum(c[1] for c in corners) / 4
    bg_b = sum(c[2] for c in corners) / 4

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            diff = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
            bright = (r + g + b) / 3

            if bright > 110 and diff < 120:
                px[x, y] = (r, g, b, 0)
            elif bright > 100 and diff < 170:
                alpha = max(0, min(a, int((diff - 120) * 5)))
                px[x, y] = (r, g, b, alpha)

    im.save(dst)


def remove_dark_bg(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if max(r, g, b) < 24:
                px[x, y] = (r, g, b, 0)

    im.save(dst)


def main() -> None:
    raws = ["music", "croc", "charm", "anxiety", "stoic"]
    os.makedirs("src/assets/products", exist_ok=True)

    for name in raws:
        remove_light_bg(f"src/assets/raw-tees/{name}.png", f"src/assets/products/{name}.png")

    remove_dark_bg("src/assets/brand/logo_raw.png", "src/assets/brand/logo.png")
    print("processed")


if __name__ == "__main__":
    main()

