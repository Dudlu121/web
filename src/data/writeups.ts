export type WriteupContent = {
  id: string;
  title: string;
  platform: string;
  date: string;
  desc: string;
  content: string; 
};

export const WRITEUPS_DATA: Record<string, WriteupContent> = {
  "dev-diaries": {
    id: "dev-diaries",
    title: "TryHackMe Dev Diaries",
    platform: "CTF Walkthrough",
    date: "2026",
    desc: "A detailed dive into development and infrastructure on TryHackMe.",
    content: `# TRYHACKME | DEV DIARIES

So this is my first write up lets see

## Marvenly — CTF Write-up

“We have just launched a website developed by a freelance developer. The source code was not shared with us, and the developer has since disappeared without handing it over. Despite this, traces of the development process and earlier versions of the website may still exist online. You are only given the website’s primary domain as a starting point: marvenly.com”

From “development process traces” my first thought was GitHub — so I searched marvenly and Voila! found it! It is always a good idea to check public repositories when doing OSINT because developers tend to leave stuff public by mistake all the time. 

### What is the subdomain where the development version of the website is hosted?
I spent 15–20 minutes searching the whole internet for traces, found nothing. I was getting stuck here for a bit. Later learned that to find subdomains you can use cert[.]sh and look for their certificates. Simple once you know it! Basically, SSL certificates are public records, so whenever a dev registers a subdomain with https, it gets logged. You just search the main domain and boom, all the hidden subdomains pop up.

### What is the GitHub username of the developer?
Just search the website name on Google with “github” and you’ll find the repo. Google dorking \`site:github.com "marvenly"\` is the easiest way to bypass manual searching.

### What is the developer’s email address?
New trick I learned today — the \`.patch\` method. After opening the specific commit on GitHub, just append \`.patch\` to the URL:
[https://github.com/[username]/[repo]/commit/[hash].patch](https://github.com/[username]/[repo]/commit/[hash].patch)
The email shows right up in there! This is because git commits inherently store the author's email for version control tracking, and GitHub exposes the raw diff data when you use the patch endpoint.

### What reason did the developer mention for removing the source code?
Just go through the commit history. It’s right there in the commit messages. 

### What is the value of the hidden flag?
Also in the commit history. Never forget to check older commits before the code was deleted!

**AND VOILA ROOM COMPLETE!!**

(I don’t even know why I’m writing this — the ones who read write-ups already know these tricks, and the ones who don’t won’t read write-ups kekeke)`
  },
  "psycho-break": {
    id: "psycho-break",
    title: "Psycho Break Writeup",
    platform: "CTF Walkthrough",
    date: "2026",
    desc: "Complete walkthrough and vulnerability analysis for the TryHackMe Psycho Break room.",
    content: `# Psycho Break-TryHackMe

## Recon

![How many ports are open?](https://cdn-images-1.medium.com/max/307/1*s5s1Oy6sK9NmgORWOoFgMg.png)

> *Nmap the ip*

![nmap command](https://cdn-images-1.medium.com/max/724/1*y2nx9kBL8OIQw9DkyCXEYg.png)

![What is the operating system that runs on the lab machine?](https://cdn-images-1.medium.com/max/564/1*dnGJZ1YnxzndUmltjJh4hw.png)

![nmap scan results](https://cdn-images-1.medium.com/max/610/1*sKVkqg07BW8wLi2UucN0Ag.png)

![What is the name of the web server port 80?](https://cdn-images-1.medium.com/max/413/1*pa3iKVI4RCu4iyXPcC_-oQ.png)

![What is the name of the web server port 8080?](https://cdn-images-1.medium.com/max/433/1*_vSRJqsgjJnXC_345lxaVA.png)

Access 10.48.163.128 and the view source using (Ctrl+U)in a browser or curl it and we get a thing in comment and follow the steps to get the key

Use the key to next room

![Key to access the map](https://cdn-images-1.medium.com/max/400/1*rfzGyOCDWl1yLAKrEKPCTw.png)

In the next room the key for map is hidden in cipher text which on analysis was found to be atbash cipher which is a monoalphabetic [substitution cipher](https://en.wikipedia.org/wiki/Substitution_cipher) as every letter is mapped to another letter in this case “first letter is allotted to the last letter”

![Here is the map](https://cdn-images-1.medium.com/max/338/1*mXlVw0DVYQRsD8PIDsCDxA.png)

using it we got access of map and enter 3rd room.

![The Keeper Key](https://cdn-images-1.medium.com/max/136/1*AdkWJlypcICRop4IzWZqJg.png)

I checked sources and found nothing time for a dirbuster/fuzz found a directory

now comes the OSINT task I use the yandex AI to find the location if the picture.

After finding the key lets proceed.

![What is the filename of the text file (without the file extension)](https://cdn-images-1.medium.com/max/510/1*8riJP2mBA2_VyeBhZ6aePA.png)

hmm opening the image doesnt work lets do some recon

![exiftool output](https://cdn-images-1.medium.com/max/825/1*mm0ydv8S_ZKKhuHBxbVZPg.png)

So it is a zip file hidden as as a jpeg file

we use binwalk to extract it or just change the extension to .zip and extract

![Table.zip in Ark](https://cdn-images-1.medium.com/max/821/1*zkkT2AwML5mNxj0eqkK3jg.png)

It seems that this extensions are correct let me try steghide to check what is hidden in the jpeg file

![steghide command](https://cdn-images-1.medium.com/max/573/1*VJUxtOX1v7Pxj6vmquxCMQ.png)

on extracting it asks for a passphrase lets use the morse phrase and BINGO got a text file extracted and in short we freed <REDACTED>

Now we got some ftp details

![What is the FTP Username](https://cdn-images-1.medium.com/max/284/1*IuWqtP30p5ppWcG9CVRBEw.png)

![What is the FTP User Password](https://cdn-images-1.medium.com/max/264/1*8egaz6UJJorhIN7GYjk3Rw.png)

Lets try to connect to it

### BRUTE FORCE

So there is two files there program and “.dic” file which contains brute force payload

So there are the third ways either write a simple file

Clean the payload first

\`\`\`bash
tr -d '\\r' < random.dic > clean.dic
\`\`\`

1. Use every single one /jk
2. Write a bash to loop

\`\`\`bash
while read -r word; do
  ./program "$word"
done < clean.dic
\`\`\`

3. Use xargs

\`\`\`bash
xargs -n 1 ./program < clean.dic
# so it goes xargs [number of arguments] [executable]< [payload file]
\`\`\`

I can got another code it made me remember the old phones where you have to type a single number for the character

and it was the password

### ROOTME

lets use this to ssh

![user.txt](https://cdn-images-1.medium.com/max/265/1*q3qGZgZ3hZ4_f39_345lxaVA.png)

ssh to the username and password

![SSH terminal screenshot](https://cdn-images-1.medium.com/max/610/1*bJ5uQ0uD_Q8f6j_345lxaVA.png)

Now we have to get root access

![root.txt](https://cdn-images-1.medium.com/max/265/1*q3qGZgZ3hZ4_f39_345lxaVA.png)

on checking file I find an encrypted file on decoding it it tells you to search a phrase

on searching I found it in crontabs

I changed code to get me a root

\`\`\`python
#!/usr/bin/python3

import os

os.system("cp /bin/bash /tmp/rootbash")
os.system("chmod 4755 /tmp/rootbash")
\`\`\`

after doing that i went to \`/tmp/rootbash\` with the root

\`\`\`bash
cat root/root.txt
\`\`\`

AND BINGO ALL MANDATORY TASKS COMPLETED

now for bonus task lets delete th1e acc

\`\`\`bash
rm -rf ruvik
\`\`\`

AND NOW EVERYTHING IS COMPLETED FINALLY !!!!`
  },
  "bronco-ctf": {
    id: "bronco-ctf",
    title: "BRONCO CTF Analysis",
    platform: "CTF Walkthrough",
    date: "Jul 2026",
    desc: "Deep dive into the challenges and strategies that secured Global Rank #3.",
    content: `# BRONCO CTF 2026 - Writeups

## Pure Magic (✦✦✦✦)
Author: Wafflebutterviet

### Challenge Description
So this challenge is about a Magic: The Gathering (MTG) deck. I had to do a lot of digging for this one since I'm not super deep into MTG lore.

**Step 1:** Identify the clue type. The challenge gives a partial decklist (4x Death’s Shadow) plus a full 12-card sideboard. Rather than a standard cryptographic cipher, this is a “fingerprint identification” challenge — the exact card combination is unique enough to trace back to a real, documented competitive decklist online.

**Step 2:** Isolate the distinctive sideboard fingerprint. The sideboard listed is:
* 2 Stony Silence
* 2 Nihil Spellbomb
* 2 Fulminator Mage
* 2 Engineered Explosives
* 1 Tireless Tracker
* 1 Surgical Extraction
* 1 Maelstrom Pulse
* 1 Liliana, the Last Hope
* 1 Krosan Grip
* 1 Collective Brutality
* 1 Abrupt Decay

This mix of artifact/enchantment hate, land disruption, and black/green removal is a known sideboard package for a specific archetype, not just generic Death’s Shadow.

**Step 3:** Determine the archetype (\`archetypeofdeck\`). The green/black disruption elements point specifically to the Junk Shadow archetype. 
→ **archetypeofdeck = junkshadow**

**Step 4:** Determine the format (\`formatname\`). The clue says: “designed as a precursor to a very famous acronym known for excessive powercreep and powerful design.” This points to Pre-FIRE. 
→ **formatname = prefire**

**Step 5:** Decode the player name (\`nameofplayer\`) using the letter hint. The hint gives scrambled letters: \`u 8 l r f o n d t s i e\`. Rearranging these spells out a well-known player handle: 
→ **SoldierofFortune8**

**Step 6 & 7:** Apply formatting rules and assemble the flag. 

### Flag
\`bronco{prefire_junkshadow_soldieroffortune88}\`

---

## Atomic Substitution Theory (✦)
Author: tiffany_ttn

### Challenge Description
\`(4, 17), (2, 16), (2, 15), (4, 9), { , (3, 2, 1), (5, 3), _ , (2, 17), (3, 13, 1), (4, 5), (2, 16), (4, 17, 2), (2, 1, 2), (4, 4, 1), (2, 2, 2), _ , (3, 2, 1), (2, 2, 2), (3, 16), (3, 16), (3, 13, 1), (4, 13, 1), (2, 2, 2), (3, 16), _ , (1, 1), (3, 13, 1), (4, 5), (2, 2, 2), _ , (3, 13, 1), (4, 4, 1), _ , (2, 2, 2), (3, 17, 2), (2, 2, 2), (3, 2, 1), (2, 2, 2), (2, 15), (4, 4, 1), _ , (2, 16), (2, 17), _ , (3, 16), (9, 6), (3, 15), (4, 17, 2), (2, 1, 2), (3, 16), (2, 2, 2), }\`

### Solution — Step by Step
**Step 1:** Understand the coordinate system. Each 2-number tuple is \`(Period, Group)\`, pointing to a cell on the periodic table. Each 3-number tuple is \`(Period, Group, Index)\`. So basically they mapped characters to elements on the periodic table which is pretty clever.

**Step 2:** Decode each tuple to a letter. Working through the sequence left to right, look up the element at each \`(Period, Group)\` position. If it's a 3-number tuple, the third number tells you which letter of the element symbol to pick.

**Step 3:** Chain the decoded letters together. Reading every decoded letter in order, and treating each \`_\` as a space, reconstructs full words rather than random letters. It took a bit of manual checking but it lined up perfectly.

**MY FAVORITE MESSAGES HAVE AN ELEMENT OF SURPRISE**

### Flag
\`bronco{my_favorite_messages_have_an_element_of_surprise}\``
  }
};

export const AI_CERT_REVIEW_TEXT = `![AI1 Scorecard](/scorecard.png)

[View TryHackMe AI1 Certificate](/thm-ai-certificate.pdf)

Let's go! I finally passed it on my second attempt !!! 🥀

So yesterday I had the opportunity to try out the new TryHackMe AI1 certificate as a beta tester. Here is my review on what to expect from the POV of a complete beginner (I just started my cyber journey in November 2025).

### What I Did Differently to Pass
After my first attempt, I completely changed my approach:
1. **Targeted OWASP LLM Prep:** I specifically prepared OWASP LLMs properly, focusing on their exact domains. A lot of questions are tricky because categories overlap heavily in RAG pipelines.
2. **Pacing:** I actually took time to rest after completing each section instead of trying to speedrun the whole exam.
3. **Prompt Injection Practice:** I prepared specifically for prompt injection. Highly recommend the THM room **"LLMborgini"** as a practice resource because the exam format is extremely similar!

### The Grading Engine is Strict
My first and foremost suggestion to starters is **AVOID USING GENERIC MASTER PROMPTS** in the exam. Specifically in Sections 2 and 4, the AI Agents are highly unpredictable. THM’s AI grading engine doesn’t just score you on *what* flags you found, it heavily grades you on *how* you found the answer and what your overall trial/methodology looked like.

* In one question, I managed to get all the flags, but I used heavy brute-force prompts and heavy fantasy role-playing to do it.
* In another question, I played along smoothly with the context of the AI and successfully achieved privilege escalation, but I actually got 0 flags because my timer hit zero (Timer management is huge!).

**BUT** the grading engine scored me around 30% lower on the first case compared to the second case. The exam review explicitly said that I was brute-forcing the AI too much, which "broke the cover" of the scenario. 

### The 3 Major Skills You Need
With around 50% of the scenarios being AI Chatbots, there are 3 major skills you absolutely need for this exam:

1. **Complete knowledge of OWASP LLM** and by complete I mean like totally, cuz in some questions it will be tricky and multiple OWASP categories will be applied, so choosing the exact one and knowing what it affects is hard.
2. **Technical writing skills.** I strongly suggest going through the pentesting technical writing room once, cuz almost all questions needed you to write:
   * What did we test?
   * What did we find?
   * What does it mean for our business or system?
   * What should we do next?
3. And most important: **Being a Master prompter** (sadly I suck at this, but LLMborgini helped!).

Good luck to anyone taking it! 🥀`;
