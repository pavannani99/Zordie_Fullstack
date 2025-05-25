import asyncio
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import async_session
from app.models.zodiac import ZodiacSign, Horoscope
from app.crud.crud_zodiac import crud_zodiac_sign, crud_horoscope

# Sample zodiac sign data
ZODIAC_SIGNS = [
    {
        "name": "Aries",
        "symbol": "Ram",
        "element": "Fire",
        "ruling_planet": "Mars",
        "start_date": date(2000, 3, 21),  # Using 2000 as a leap year
        "end_date": date(2000, 4, 19),
        "description": "Aries is the first sign of the zodiac. Those born under this sign are passionate, motivated, and confident leaders who build community with their cheerful disposition and relentless determination."
    },
    {
        "name": "Taurus",
        "symbol": "Bull",
        "element": "Earth",
        "ruling_planet": "Venus",
        "start_date": date(2000, 4, 20),
        "end_date": date(2000, 5, 20),
        "description": "Taurus is an earth sign represented by the bull. Like their celestial spirit animal, Taureans enjoy relaxing in serene, bucolic environments surrounded by soft sounds, soothing aromas, and succulent flavors."
    },
    {
        "name": "Gemini",
        "symbol": "Twins",
        "element": "Air",
        "ruling_planet": "Mercury",
        "start_date": date(2000, 5, 21),
        "end_date": date(2000, 6, 20),
        "description": "Gemini is represented by the twins, and these air signs are interested in so many pursuits that they had to be symbolized by two people instead of one."
    },
    {
        "name": "Cancer",
        "symbol": "Crab",
        "element": "Water",
        "ruling_planet": "Moon",
        "start_date": date(2000, 6, 21),
        "end_date": date(2000, 7, 22),
        "description": "Cancer is a cardinal water sign. Represented by the crab, this oceanic crustacean seamlessly weaves between the sea and shore representing Cancer's ability to exist in both emotional and material realms."
    },
    {
        "name": "Leo",
        "symbol": "Lion",
        "element": "Fire",
        "ruling_planet": "Sun",
        "start_date": date(2000, 7, 23),
        "end_date": date(2000, 8, 22),
        "description": "Leo is represented by the lion, and these spirited fire signs are the kings and queens of the celestial jungle. They're delighted to embrace their royal status: Vivacious, theatrical, and passionate."
    },
    {
        "name": "Virgo",
        "symbol": "Virgin",
        "element": "Earth",
        "ruling_planet": "Mercury",
        "start_date": date(2000, 8, 23),
        "end_date": date(2000, 9, 22),
        "description": "Virgo is an earth sign historically represented by the goddess of wheat and agriculture, an association that speaks to Virgo's deep-rooted presence in the material world."
    },
    {
        "name": "Libra",
        "symbol": "Scales",
        "element": "Air",
        "ruling_planet": "Venus",
        "start_date": date(2000, 9, 23),
        "end_date": date(2000, 10, 22),
        "description": "Libra is an air sign represented by the scales, an association that reflects Libra's fixation on balance and harmony. Libra is obsessed with symmetry and strives to create equilibrium in all areas of life."
    },
    {
        "name": "Scorpio",
        "symbol": "Scorpion",
        "element": "Water",
        "ruling_planet": "Pluto, Mars",
        "start_date": date(2000, 10, 23),
        "end_date": date(2000, 11, 21),
        "description": "Scorpio is one of the most misunderstood signs of the zodiac. Because of its incredible passion and power, Scorpio is often mistaken for a fire sign. In fact, Scorpio is a water sign that derives its strength from the psychic, emotional realm."
    },
    {
        "name": "Sagittarius",
        "symbol": "Archer",
        "element": "Fire",
        "ruling_planet": "Jupiter",
        "start_date": date(2000, 11, 22),
        "end_date": date(2000, 12, 21),
        "description": "Sagittarius, the ninth sign of the zodiac, is the home of the wanderers of the zodiac. It's not a mindless ramble for these folks, either. Sagittarians are truth-seekers, and the best way for them to do this is to hit the road, talk to others and get some answers."
    },
    {
        "name": "Capricorn",
        "symbol": "Goat",
        "element": "Earth",
        "ruling_planet": "Saturn",
        "start_date": date(2000, 12, 22),
        "end_date": date(2000, 1, 19),
        "description": "Capricorn is climbing the mountain straight to the top and knows that patience, perseverance, and dedication is the only way to scale. The last earth sign of the zodiac, Capricorn, is represented by the sea-goat, a mythological creature with the body of a goat and the tail of a fish."
    },
    {
        "name": "Aquarius",
        "symbol": "Water Bearer",
        "element": "Air",
        "ruling_planet": "Uranus, Saturn",
        "start_date": date(2000, 1, 20),
        "end_date": date(2000, 2, 18),
        "description": "Despite the 'aqua' in its name, Aquarius is actually the last air sign of the zodiac. Innovative, progressive, and shamelessly revolutionary, Aquarius is represented by the water bearer, the mystical healer who bestows water, or life, upon the land."
    },
    {
        "name": "Pisces",
        "symbol": "Fish",
        "element": "Water",
        "ruling_planet": "Neptune, Jupiter",
        "start_date": date(2000, 2, 19),
        "end_date": date(2000, 3, 20),
        "description": "Pisces, a water sign, is the last constellation of the zodiac. It's symbolized by two fish swimming in opposite directions, representing the constant division of Pisces's attention between fantasy and reality."
    },
]

# Sample horoscope data for today
SAMPLE_HOROSCOPES = [
    {
        "zodiac_sign_name": "Aries",
        "content": "Today is a great day for new beginnings. Your energy is high, and you'll find yourself motivated to start projects that have been on your mind. Trust your instincts and take that first step.",
        "mood": "Energetic",
        "lucky_number": 7,
        "lucky_color": "Red"
    },
    {
        "zodiac_sign_name": "Taurus",
        "content": "Focus on stability today. Financial matters may require your attention, but your practical nature will help you make sound decisions. Take time to appreciate the comforts around you.",
        "mood": "Grounded",
        "lucky_number": 6,
        "lucky_color": "Green"
    },
    {
        "zodiac_sign_name": "Gemini",
        "content": "Communication is highlighted today. Your words have power, so use them wisely. A conversation with a friend might lead to an exciting opportunity. Stay curious and open-minded.",
        "mood": "Talkative",
        "lucky_number": 3,
        "lucky_color": "Yellow"
    },
    {
        "zodiac_sign_name": "Cancer",
        "content": "Your intuition is particularly strong today. Listen to your inner voice when making decisions. Home and family matters may require your attention, bringing comfort and emotional fulfillment.",
        "mood": "Intuitive",
        "lucky_number": 2,
        "lucky_color": "Silver"
    },
    {
        "zodiac_sign_name": "Leo",
        "content": "Your creative energy is at its peak today. Express yourself through art, music, or any medium that speaks to you. Your natural leadership abilities will shine in group settings.",
        "mood": "Creative",
        "lucky_number": 1,
        "lucky_color": "Gold"
    },
    {
        "zodiac_sign_name": "Virgo",
        "content": "Details matter today. Your analytical skills will help you solve a complex problem. Take time to organize your space or thoughts—the clarity will benefit you in unexpected ways.",
        "mood": "Analytical",
        "lucky_number": 5,
        "lucky_color": "Navy Blue"
    },
    {
        "zodiac_sign_name": "Libra",
        "content": "Balance is key today. You may find yourself mediating a dispute or finding harmony in your own life. Relationships are highlighted, bringing opportunities for deeper connections.",
        "mood": "Harmonious",
        "lucky_number": 6,
        "lucky_color": "Pink"
    },
    {
        "zodiac_sign_name": "Scorpio",
        "content": "Transformation is in the air. You might feel drawn to explore deeper aspects of yourself or a situation. Trust your instincts and don't fear the unknown—growth awaits on the other side.",
        "mood": "Intense",
        "lucky_number": 9,
        "lucky_color": "Burgundy"
    },
    {
        "zodiac_sign_name": "Sagittarius",
        "content": "Adventure calls to you today. Whether physical or intellectual, exploration will bring joy and new perspectives. Your optimism is contagious, lifting the spirits of those around you.",
        "mood": "Adventurous",
        "lucky_number": 3,
        "lucky_color": "Purple"
    },
    {
        "zodiac_sign_name": "Capricorn",
        "content": "Focus on your goals today. Your disciplined approach will bring you closer to success. A professional opportunity may arise—be ready to showcase your skills and reliability.",
        "mood": "Determined",
        "lucky_number": 8,
        "lucky_color": "Brown"
    },
    {
        "zodiac_sign_name": "Aquarius",
        "content": "Innovation is your strength today. Your unique perspective will offer solutions others haven't considered. Connect with like-minded individuals who appreciate your visionary ideas.",
        "mood": "Inventive",
        "lucky_number": 4,
        "lucky_color": "Electric Blue"
    },
    {
        "zodiac_sign_name": "Pisces",
        "content": "Your compassion shines today. You may feel called to help others or engage in creative pursuits. Trust your intuition and allow your imagination to guide you to new possibilities.",
        "mood": "Compassionate",
        "lucky_number": 7,
        "lucky_color": "Sea Green"
    },
]

async def init_zodiac_data(db: AsyncSession) -> None:
    """Initialize the database with sample zodiac data"""
    print("Initializing zodiac data...")
    
    # Create zodiac signs
    for sign_data in ZODIAC_SIGNS:
        existing_sign = await crud_zodiac_sign.get_by_name(db, name=sign_data["name"])
        if not existing_sign:
            sign_obj = ZodiacSign(**sign_data)
            db.add(sign_obj)
            print(f"Created zodiac sign: {sign_data['name']}")
    
    # Commit to get IDs for the signs
    await db.commit()
    
    # Create horoscopes for today
    today = date.today()
    for horoscope_data in SAMPLE_HOROSCOPES:
        # Get the zodiac sign
        sign_name = horoscope_data.pop("zodiac_sign_name")
        sign = await crud_zodiac_sign.get_by_name(db, name=sign_name)
        
        if sign:
            # Check if horoscope already exists for this sign and date
            existing_horoscope = await crud_horoscope.get_by_sign_and_date(
                db, zodiac_sign_id=sign.id, date=today
            )
            
            if not existing_horoscope:
                # Create the horoscope
                horoscope_obj = Horoscope(
                    zodiac_sign_id=sign.id,
                    date=today,
                    **horoscope_data
                )
                db.add(horoscope_obj)
                print(f"Created horoscope for {sign_name} on {today}")
    
    # Commit the changes
    await db.commit()
    print("Zodiac data initialization completed")

async def main() -> None:
    """Main function to initialize zodiac data"""
    async with async_session() as session:
        await init_zodiac_data(session)

if __name__ == "__main__":
    asyncio.run(main())
