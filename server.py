from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Permite requisições de outros domínios (ex: seu front-end em localhost:5174)

def change_color(image, old_rgb, new_rgb):
    """
    Substitui a cor old_rgb pela cor new_rgb em uma imagem, preservando a transparência.
    """
    img = image.convert("RGBA")
    width, height = img.size
    pixels = img.load()

    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if (r, g, b) == old_rgb:
                pixels[x, y] = (new_rgb[0], new_rgb[1], new_rgb[2], a)
    return img

@app.route('/api/change-color', methods=['GET', 'POST'])
def api_change_color():
    if request.method == 'GET':
        return jsonify({
            'message': 'Endpoint para alterar cor. Utilize o método POST para enviar uma imagem.'
        })

    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']

    try:
        r = int(request.form.get('r', 0))
        g = int(request.form.get('g', 0))
        b = int(request.form.get('b', 0))
        posR = int(request.form.get('posR', 0))
        posG = int(request.form.get('posG', 0))
        posB = int(request.form.get('posB', 0))
    except ValueError:
        return jsonify({'error': 'Invalid color values'}), 400

    try:
        img = Image.open(image_file)
    except Exception:
        return jsonify({'error': 'Could not open image'}), 400

    updated_image = change_color(img, (r, g, b), (posR, posG, posB))

    img_io = io.BytesIO()
    updated_image.save(img_io, format='PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)  # Roda o servidor na porta 5000
