import random



characters = ["Mario", "Luigi", "Peach","Daisy", "Rosalina", "Tanooki Mario",
"Cat Peach", "Yoshi","Toad","Koopa Troopa","Shy Guy","Lakitu","Toadette",
"King Boo","Baby Mario","Baby Luigi","Baby Peach","Baby Daisy","Baby Rosalina",
"Metal Mario","Pink Gold Peach","Wario","Waluigi","Donkey Kong","Bowser",
"Dry Bones","Bowser Jr.","Dry Bowser","Lemmy","Larry","Wendy","Ludwig",
"Iggy","Roy","Morton","Inkling Girl","Inkling Boy","Link","Villager (Male)",
"Villager (Female)","Isabelle","Mii","Gold Mario"]

character = random.choice(characters)


if character == "Yoshi" :
    Yoshis = ["Red Yoshi","Blue Yoshi","Light-blue Yoshi","Yellow Yoshi","Pink Yoshi",
"Black Yoshi","White Yoshi","Orange Yoshi"]
    character = random.choice(Yoshis)

elif character == "Shy Guy": 
    shyguys = ["Green Shy Guy","Blue Shy Guy","Light-Blue Shy Guy","Yellow Shy Guy","Pink Shy Guy",
                "Black Shy Guy","White Shy Guy","Orange Shy Guy"]
    character = random.choice(shyguys)


elif character == "Inkling Girl":
    character = random.choice(["Inkling Girl (lime green)","Inkling Girl (magenta)"] )

elif character == "Inkling Boy":
    character = random.choice(["Inkling Boy (purple)", "Inkling Boy (teal)"])

elif character == "Link":
    links = ["Normal Link","Link (Breath of the Wild)"]
    character = random.choice(links)

print(character)







