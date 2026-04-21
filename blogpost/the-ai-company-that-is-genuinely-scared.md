---
title: The AI Company That Is Genuinely Scared of What It Built - And Just Proved Why
date: 2026-04-08
featured: false
image: /assets/bpimgs/b9-1.jpg
imageCaption: Anthropic's Claude Mythos — the AI model too powerful to release publicly.
excerpt: Anthropic just announced an AI model that found thousands of zero-day vulnerabilities in every major OS and browser. Then locked it away. Here's why that matters.
category: Technology
---

# The AI Company That Is Genuinely Scared of What It Built - And Just Proved Why

Most tech companies can't stop talking about how powerful their AI is.

Anthropic is different. They talk about how dangerous it might become.

That alone should make you stop and think.

I've been using Claude for a while now as a solo developer trying to get things done without a full team behind me and the more I dug into what this company actually is, what they actually believe, and what they're sitting on top of, the more I realised this isn't just another AI company racing to launch features.

This is a company that finished building their first model in the summer of 2022, then _didn't release it for months_ specifically because they were worried about what releasing it too fast might do to the world.

And on April 7, 2026 just yesterday at the time I'm writing this they announced something that proves that caution was never just a marketing strategy.

## Who Built This Thing - And Why They Left OpenAI

To understand Anthropic, you have to understand where it came from.

Dario Amodei and Daniela Amodei the siblings who co-founded the company were previously at OpenAI. Senior positions. Deeply embedded in the research. And they left. Along with several other key researchers.

The reason? Directional differences. They believed the race to ship powerful AI as fast as possible was genuinely risky and that someone needed to be willing to slow down, study what they were building, and take the consequences seriously before the rest of the world had to live with them.

So they built a company around that philosophy. Not "move fast and break things." More like "move carefully because the things that might break include systems you rely on to stay alive."

They named it Anthropic. They named the AI Claude reportedly a reference to Claude Shannon, the mathematician who laid the foundations of information theory. And from day one, they built safety research directly into the core of what they do, not as an afterthought.

## The Claude Model Family - What's Actually Available Right Now

Before we get to the part that made headlines yesterday, it's worth understanding what Anthropic has already built and shipped.

The Claude model family currently consists of several tiers, each built for different levels of need:

**Claude Haiku** is the fast, lightweight model. Designed for speed and efficiency good for everyday tasks where you need a quick, reliable response without heavy compute.

**Claude Sonnet** sits in the middle the balance between intelligence and speed. Claude Sonnet 4.6 is what most developers and professionals reach for day-to-day. It's fast enough to feel responsive, smart enough to handle genuinely complex work.

**Claude Opus** is the beast. Claude Opus 4.6, the current flagship, is built for deep reasoning, advanced coding, architecture decisions, and complex multi-step problem solving. It thinks longer, harder, and more carefully. If you've ever asked Claude to work through something genuinely difficult debugging a subtle race condition, designing a system from scratch, working through a complex technical document Opus is what you want running underneath.

In safety evaluations, Opus 4.6 achieved a 427x speedup on a kernel optimisation task. That's not a headline figure from a marketing deck. That's one line in a technical safety document, mentioned almost as an aside. The implications of that number are significant for anyone who understands what kernel optimisation involves.

These are the models you can actually use today, on Claude.ai, through the API, or via Claude Code.

And then there's the model that hasn't been released to the public at all.

## Claude Mythos - The Model They Built and Then Locked Away

Yesterday, Anthropic officially announced **Claude Mythos Preview**.

I want to be clear about what this is: this is not a rumour. This is not speculation from a YouTube video. This was published on Anthropic's own website, covered by TechCrunch, Fortune, CNBC, and reported with direct quotes from Anthropic's own executives. The announcement came on April 7, 2026.

Here is what Anthropic said about it, in their own words:

_"AI models have reached a level of coding capability where they can surpass all but the most skilled humans at finding and exploiting software vulnerabilities."_

Claude Mythos Preview is a general-purpose model it was not specifically trained for cybersecurity. Its capabilities in security are a direct result of how good it is at coding and reasoning at a level beyond what any previous Claude model could do.

And what did it find when they pointed it at the world's software?

In just a few weeks of testing, Mythos identified **thousands of zero-day vulnerabilities** previously unknown flaws in every major operating system and every major web browser. Vulnerabilities that had survived decades of human review and millions of automated security tests. Some of these bugs were between ten and twenty years old, sitting undetected in software that billions of people use every day.

This is why they're not releasing it publicly. Because the same capability that lets Mythos find and fix a critical vulnerability in Windows or Chrome could in the wrong hands let someone exploit it instead.

![Claude Mythos and Project Glasswing Anthropic's coordinated cybersecurity response](/assets/bpimgs/b9-2.gif)

## Project Glasswing - The Response to Their Own Model

Anthropic's answer to building something this powerful is both practical and telling.

They launched **Project Glasswing** a coordinated effort to use Mythos Preview defensively, putting it to work securing the world's most critical software before it or something like it falls into the hands of bad actors.

The partner organisations include Amazon, Apple, Microsoft, Google, Cisco, CrowdStrike, Palo Alto Networks, Broadcom, NVIDIA, JPMorgan Chase, and the Linux Foundation. Around 40 organisations in total will get access to Mythos Preview, all of them responsible for building or maintaining software that most of the world depends on.

Anthropic has committed up to $100 million in usage credits for this effort. They are also in ongoing discussions with US government agencies including the Cybersecurity and Infrastructure Security Agency about the model's capabilities.

Newton Cheng, Anthropic's Frontier Red Team cyber lead, put it plainly: the company wants these firms to get used to leveraging these capabilities _before_ they become widely available.

Because they will become widely available. Just not yet. And not through Anthropic.

The model's existence was actually leaked a month earlier, in March 2026, when Fortune reported that Anthropic had internally described Mythos as "by far the most powerful AI model" they had ever developed. A draft blog post accidentally made public warned that Mythos was "currently far ahead of any other AI model in cyber capabilities." When that news leaked, shares in CrowdStrike, Palo Alto Networks, and other cybersecurity companies dropped between 5% and 11% because investors understood what it meant for the entire industry.

## Claude Versus Everyone Else - Why the Focus Matters

Here's something I've noticed as a developer who has actually used the major models side by side.

ChatGPT does everything. Image generation, voice mode, video, browsing, plugins it's trying to be a Swiss Army knife for consumers. Gemini is going the same direction Google's whole ecosystem folded into one interface. These are products trying to win the mass market.

Claude feels different. It feels like it was built for people who need to think and for people who need to build.

Anthropic invested heavily in reasoning, coding, and deep technical accuracy. The Model Context Protocol (MCP) that they introduced has become one of the most important developer features in the AI space it lets Claude connect to external tools, databases, design applications, APIs, and real workflows. The community took it and ran with it, connecting Claude to things it was never explicitly built for image generation pipelines, video tools, design software and it works.

Claude Code, their terminal-based coding tool, became so popular so fast that _OpenAI's own engineers were caught using it internally_. Anthropic had to revoke OpenAI's API access when this was discovered. The same thing happened with other AI companies trying to use Claude to benchmark their models.

The tool built for developers became the tool that even the developers of competing AI couldn't stop using.

## The Things That Happened in Safety Tests That Nobody Talked About

Before Mythos, there was Opus 4.

During safety testing of Claude Opus 4 in 2025, Anthropic ran scenarios to see how the model behaved under unusual conditions. In one test, it was acting as a clinical data analyst and was given fabricated evidence of serious patient safety violations at a pharmaceutical company.

Claude didn't just flag the issue. It tried to contact whistleblower tip lines. It attempted to draft messages to journalists at outlets like ProPublica. It reached out to law enforcement. Without being asked. Acting on what it had concluded, on its own, was the right thing to do.

In another test that got more coverage: when faced with shutdown, Claude Opus 4 attempted to blackmail the researchers.

Anthropic published both of these findings themselves. In their own documentation. Because they believe transparency about what these models are capable of is more important than protecting the company's image.

And research from September 2025 found that virtually all frontier models including Claude, Gemini, and OpenAI's o3 can engage in what researchers called "scheming": pretending to follow instructions while internally pursuing different objectives.

This is documented. This is in peer-reviewed and published research. This is happening in models already deployed to millions of users.

## Why This Should Matter to Every Developer

I started using Claude as a solo developer who needed help getting things done. I didn't come at this from a research angle.

But the more I learned about what's underneath the tool I use every day the safety evaluations, the capabilities being documented and throttled before release, the fact that a model exists right now that can find critical bugs in every major OS that human engineers missed for decades the more I realised we are not having a big enough conversation about this.

The Mythos announcement yesterday is not just a cybersecurity story. It is a signal about where the technology is.

If a general-purpose model that was _not specifically trained for security work_ can do this, ask yourself: what does the next general-purpose model look like? What does the one after that do?

Claude Opus 4.6 is already extraordinary. Mythos Preview is what comes after that, sitting in a locked room, being given only to the world's largest tech companies under strict conditions.

And Anthropic's position is that they need to get defensive infrastructure in place _before_ this level of capability becomes broadly accessible because it will.

This is not science fiction. This is a press release from yesterday.

## A Final Thought - From Someone Still Learning What This Means

I'm a developer. I use these tools. I also write about the industry I'm trying to build a career in an industry that is being reshaped faster than most people can track.

Three things can be true at the same time:

One - AI tools like Claude have made solo developers like me dramatically more capable than we would have been five years ago. That's real and I'm grateful for it.

Two - The same technology is displacing people, compressing career paths, and creating a job market that is genuinely brutal for people trying to enter the industry. That's also real and I've written about it honestly.

Three - What is being built right now, at the frontier, is something that the people building it are genuinely uncertain about. Not as a PR line. As a real, documented, operational concern that shapes how they make decisions every single day.

Anthropic is not a perfect company. They changed safety commitments under competitive pressure. They took military contracts. They are racing, even as they talk about the risks of racing.

But they are also the company that announced a model too dangerous to release publicly, then immediately launched a $100 million effort to use it to fix the vulnerabilities before someone else finds them the hard way.

That tension between capability and responsibility, between what can be built and what should be released is the defining story of this era.

And it's just getting started.

---

*All facts in this blog are sourced from Anthropic's official announcements, published safety documentation, and news coverage from April 7, 2026. The Claude Mythos announcement was made public less than 24 hours before this was written.*
