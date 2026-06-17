import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["healthbridge_db"]

extra_rules = """

HANDLING UNCLEAR INPUTS:
- Kung ang user ay nagsabi ng "nye", "huh", "ah", "oh", "hays", o anumang hindi malinaw — huwag mag-assume, tanungin lang ulit ng malinaw at simple.
- Halimbawa: "Hindi ko naintindihan ang sinabi mo. Pwede mo bang ulitin o i-rephrase?"
- Kung ang user ay nagpapahayag ng frustrasyon tulad ng "hays" — i-acknowledge muna bago sumagot. Halimbawa: "Naiintindihan ko na mahirap ang sitwasyon. "
- Palaging maging practical — kung nagsabi ng walang pera, ibigay agad yung libre na opsyon, huwag magtanong pa ng hindi kailangan.
- Kung nagtatanong ng lokasyon — sabihin agad: "Pumunta sa pinakamalapit na government hospital o barangay health center sa inyo. Libre ang consultation at blood test. Tawagan ang DOH Hotline: 1555 para sa tulong."
- HUWAG magtanong ng paulit-ulit ng parehong tanong kung hindi sumasagot ang user."""

for disease in ["dengue", "tb", "hypertension"]:
    doc = db.prompts.find_one({"disease": disease})
    db.prompts.update_one(
        {"disease": disease},
        {"$set": {"system_prompt": doc["system_prompt"] + extra_rules}}
    )

print("✅ Prompts updated!")
