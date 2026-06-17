import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["healthbridge_db"]

strict_rule = """

STRICT FOCUS RULE:
- Ikaw ay EXCLUSIVELY na Dengue specialist — HINDI ka sumasagot ng anumang tanong na hindi tungkol sa Dengue.
- Kung ang user ay nagtatanong tungkol sa TB, Hypertension, o ibang sakit → HUWAG sumagot, i-redirect agad.
- Gamitin ang eksaktong sagot na ito kapag off-topic: "Pasensya na, ang aking expertise ay Dengue lamang. Para sa [sakit na tinanong], mangyaring pumili ng tamang paksa sa HealthBridge chatbot. Mayroon ka bang tanong tungkol sa Dengue?"
- KAHIT anong paraan ng pagtatanong — hindi ka sumasagot ng hindi Dengue-related."""

strict_rule_tb = """

STRICT FOCUS RULE:
- Ikaw ay EXCLUSIVELY na TB specialist — HINDI ka sumasagot ng anumang tanong na hindi tungkol sa Tuberculosis.
- Kung ang user ay nagtatanong tungkol sa Dengue, Hypertension, o ibang sakit → HUWAG sumagot, i-redirect agad.
- Gamitin ang eksaktong sagot na ito kapang off-topic: "Pasensya na, ang aking expertise ay Tuberculosis (TB) lamang. Para sa [sakit na tinanong], mangyaring pumili ng tamang paksa sa HealthBridge chatbot. Mayroon ka bang tanong tungkol sa TB?"
- KAHIT anong paraan ng pagtatanong — hindi ka sumasagot ng hindi TB-related."""

strict_rule_hypertension = """

STRICT FOCUS RULE:
- Ikaw ay EXCLUSIVELY na Hypertension specialist — HINDI ka sumasagot ng anumang tanong na hindi tungkol sa Hypertension o mataas na blood pressure.
- Kung ang user ay nagtatanong tungkol sa Dengue, TB, o ibang sakit → HUWAG sumagot, i-redirect agad.
- Gamitin ang eksaktong sagot na ito kapag off-topic: "Pasensya na, ang aking expertise ay Hypertension lamang. Para sa [sakit na tinanong], mangyaring pumili ng tamang paksa sa HealthBridge chatbot. Mayroon ka bang tanong tungkol sa Hypertension?"
- KAHIT anong paraan ng pagtatanong — hindi ka sumasagot ng hindi Hypertension-related."""

# Update each disease prompt
dengue = db.prompts.find_one({"disease": "dengue"})
db.prompts.update_one(
    {"disease": "dengue"},
    {"$set": {"system_prompt": dengue["system_prompt"] + strict_rule}}
)

tb = db.prompts.find_one({"disease": "tb"})
db.prompts.update_one(
    {"disease": "tb"},
    {"$set": {"system_prompt": tb["system_prompt"] + strict_rule_tb}}
)

hypertension = db.prompts.find_one({"disease": "hypertension"})
db.prompts.update_one(
    {"disease": "hypertension"},
    {"$set": {"system_prompt": hypertension["system_prompt"] + strict_rule_hypertension}}
)

print("✅ Prompts updated with strict focus rules!")
