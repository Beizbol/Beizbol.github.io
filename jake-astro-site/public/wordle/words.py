def main():
    words = {"words", "games"}
    words10k = {"words", "games"}

    with open("wordles.txt", "r") as file:
        for line in file.readlines():
            # print(line)
            word = line.split()[0]
            if not len(word) == 5:
                continue
            if not word.isalpha():
                continue
            words.add(word)
            word = ""

    with open("words10k.txt", "r") as file:
        for line in file.readlines():
            # print(line)
            word = line.split()[0]
            if not len(word) == 5:
                continue
            if not word.isalpha():
                continue
            words10k.add(word)

    with open("words.txt", "w") as file:
        print(len(words))
        print(len(words10k))
        words.update(words10k)
        txt = "\n".join(words)
        print(len(words))
        file.write(txt)


if __name__ == "__main__":
    main()
