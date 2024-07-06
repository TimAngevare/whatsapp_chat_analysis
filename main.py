import sys
import analysis.chat as chat

chat = chat.Chat(sys.argv[1])
chat.read()
chat.analyse()
print(chat.getData())
chat.saveFile()