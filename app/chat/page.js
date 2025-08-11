import { Layout } from "@/components/layout"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Search,
  Pin,
  Check,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Link2,
  Send
} from "lucide-react"

const pinnedChats = [
  {
    name: "Dunald Perrier",
    img: "/chatImg/client-10.png",
    status: "Typing...",
    time: "8:20 PM",
    unread: 6,
    active: true
  },
  {
    name: "Faulkner Nowmi",
    img: "/chatImg/client-11.png",
    status: "Hello everyone...",
    time: "9:36 AM",
    unread: 0,
    active: false
  },
  {
    name: "Langley Millan",
    img: "/chatImg/client-12.png",
    status: "That's Cool, go for it..",
    time: "7:18 AM",
    unread: 0,
    active: false
  },
  {
    name: "Edwards Runa",
    img: "/chatImg/client-13.png",
    status: "Great",
    time: "6:30 PM",
    unread: 0,
    active: false
  }
]
const allChats = [
  {
    name: "Elsie Soniya",
    img: "/chatImg/client-14.png",
    status: "Typing...",
    time: "4:30 PM",
    unread: 2,
    active: false
  },
  {
    name: "Wagner Sarah",
    img: "/chatImg/client-9.png",
    status: "What are you...",
    time: "9:36 AM",
    unread: 0,
    active: false
  },
  {
    name: "Smith Killiyan",
    img: "/chatImg/client-8.png",
    status: "🎤 Vice message",
    time: "2:18 AM",
    unread: 0,
    active: false
  },
  {
    name: "Roseph Mukesh",
    img: "/chatImg/client-7.png",
    status: "Cool 🔥",
    time: "5:30 PM",
    unread: 0,
    active: false
  }
]
const messages = [
  {
    from: "other",
    img: "/chatImg/client-11.png",
    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit pharetra ligula non varius curabitur etiam malesuada congue eget luctus aliquet consectetur.",
    time: "19:04"
  },
  {
    from: "me",
    img: "/chatImg/client-10.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "12:01"
  },
  {
    from: "other",
    img: "/chatImg/client-11.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra ligula non varius.",
    time: "01:08"
  },
  {
    from: "other",
    img: "/chatImg/client-11.png",
    text: "Lorem ipsum dolor sit amet. 🔥",
    time: "01:08"
  },
  {
    from: "me",
    img: "/chatImg/client-10.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit.",
    time: "02:00"
  },
  {
    from: "me",
    img: "/chatImg/client-10.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "02:00"
  },
  {
    from: "other",
    img: "/chatImg/client-11.png",
    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit pharetra ligula non varius curabitur etiam malesuada congue eget luctus aliquet consectetur.",
    time: "19:04"
  }
]

export default function Chat() {
  return (
    <Layout>
      <div className="px-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-900">Chat</h1>
        <p className="text-gray-600 mb-6">Communicate with patients and staff</p>
      </div>
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] gap-4">
        
        {/* Sidebar */}
        <aside className="w-full md:w-[350px] bg-white rounded-xl shadow-md flex flex-col h-full max-h-[900px] border border-gray-200">
          <div className="p-6 pb-2 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Message</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search here.."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pt-2 pb-4">
            <div className="mb-4">
              <span className="text-xs text-gray-500 font-semibold tracking-widest">PINNED</span>
              <ul className="mt-2 space-y-2">
                {pinnedChats.map((chat, i) => (
                  <li key={chat.name} className={`flex items-center justify-between rounded-lg px-2 py-2 cursor-pointer transition ${chat.active ? 'bg-blue-50' : 'hover:bg-gray-100'}`}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.img} alt={chat.name} />
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-900 text-sm">{chat.name}</span>
                          {i === 0 && <span className="ml-1"><Pin className="h-3 w-3 text-blue-500" /></span>}
                        </div>
                        <span className="text-xs text-green-500">{chat.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 min-w-[40px]">
                      <span className="text-xs text-gray-400">{chat.time}</span>
                      {chat.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-semibold">{chat.unread}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-semibold tracking-widest">ALL MESSAGES</span>
              <ul className="mt-2 space-y-2">
                {allChats.map((chat) => (
                  <li key={chat.name} className={`flex items-center justify-between rounded-lg px-2 py-2 cursor-pointer transition hover:bg-gray-100`}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.img} alt={chat.name} />
                      </Avatar>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{chat.name}</span>
                        <span className="block text-xs text-gray-500">{chat.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 min-w-[40px]">
                      <span className="text-xs text-gray-400">{chat.time}</span>
                      {chat.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-semibold">{chat.unread}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        
        {/* Main Chat Area */}
        <section className="flex-1 flex flex-col bg-white rounded-xl shadow-md border border-gray-200 h-full max-h-[900px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/chatImg/client-10.png" alt="Dunald Perrier" />
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-base">Dunald Perrier</span>
                  <span className="text-xs text-green-500">Active Now</span>
                </div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon"><Phone className="h-5 w-5 text-gray-400" /></Button>
              <Button variant="ghost" size="icon"><Video className="h-5 w-5 text-gray-400" /></Button>
              <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5 text-gray-400" /></Button>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'other' && (
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={msg.img} alt="user" />
                  </Avatar>
                )}
                <div className={`max-w-[60%] rounded-xl px-6 py-4 text-sm shadow-sm ${msg.from === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}>
                  {msg.text}
                  <div className="flex justify-end mt-2">
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                </div>
                {msg.from === 'me' && (
                  <Avatar className="h-10 w-10 ml-3">
                    <AvatarImage src={msg.img} alt="me" />
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          {/* Input Bar */}
          <form className="flex items-center gap-3 px-8 py-6 border-t border-gray-200 bg-white">
            <Button variant="ghost" size="icon" type="button"><Smile className="h-5 w-5 text-gray-400" /></Button>
            <Button variant="ghost" size="icon" type="button"><Link2 className="h-5 w-5 text-gray-400" /></Button>
            <input
              type="text"
              placeholder="Type something..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 text-white"><Send className="h-5 w-5" /></Button>
          </form>
        </section>
      </div>
    </Layout>
  )
} 