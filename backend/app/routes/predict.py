"""
Prediction route — POST /predict

Accepts a multipart image upload, runs inference, generates a Grad-CAM
heatmap, and returns the result as JSON.
"""

from fastapi import APIRouter, File, UploadFile, HTTPException

from app.utils.image_utils import (
    validate_image,
    load_image_from_bytes,
    preprocess_image,
    numpy_to_base64,
)
from app.services.model_service import load_model, predict, LAST_CONV_LAYER
from app.services.gradcam import generate_gradcam, overlay_heatmap

router = APIRouter()


@router.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    """
    Accept an image and return prediction + Grad-CAM heatmap.

    **Request**: multipart/form-data with field `file`.

    **Response**:
    ```json
    {
        "label": "AI-Generated",
        "confidence": 0.93,
        "reliability": "High",
        "heatmap": "<base64_png>"
    }
    ```
    """
    # --- Validate ---------------------------------------------------------
    contents = await file.read()
    error = validate_image(file.content_type, len(contents))
    if error:
        raise HTTPException(status_code=400, detail=error)

    # --- Preprocess -------------------------------------------------------
    original_image = load_image_from_bytes(contents)
    img_tensor = preprocess_image(original_image)

    # --- Predict ----------------------------------------------------------
    result = predict(img_tensor)

    # --- Grad-CAM ---------------------------------------------------------
    model = load_model()
    heatmap = generate_gradcam(model, img_tensor, last_conv_layer_name=LAST_CONV_LAYER)
    overlay = overlay_heatmap(original_image, heatmap)
    heatmap_b64 = numpy_to_base64(overlay)

    return {
        "label": result["label"],
        "confidence": result["confidence"],
        "reliability": result["reliability"],
        "heatmap": heatmap_b64,
    }
