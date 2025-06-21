import React from 'react'; 
import i1 from '@/assets/bento/image1.png';
import i2 from '@/assets/bento/image2.png';
import i3 from '@/assets/bento/image3.png';
import i4 from '@/assets/bento/image4.png';
import i5 from '@/assets/bento/image5.png';
import i6 from '@/assets/bento/image6.png';
const FeatureBentoGrid = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Custom Grid Layout: Ticketing (2 cols) + Stacked Cards (1 col) on top, then 3 equal cards below */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Row */}
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticketing - Spans 2 columns */}
          <div
            className="lg:col-span-2 rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-300 group"
            style={{ background: "linear-gradient(180deg, #EFFBFE 0%, #CAF0F8 100%)" }}
          >
            <div className="flex flex-col h-full">
              <div className="">
                <h3 className="text-2xl font-bold text-gray-900 ">Ticketing</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Easily collaborate with colleagues to quickly solve complex problems, as well as allow customers to
                  track progress in real time.
                </p>
              </div>
              <div className="flex flex items-end">
                <div className="w-full">
                  <img
                    src={i1}
                    alt="Ticketing details modal showing assignee and team information"
                    className="w-full h-136 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stacked Cards */}
          <div className="flex flex-col gap-6">
            {/* Configurable - Top of stack */}
            <div
              className="rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 group flex-1"
              style={{ background: "linear-gradient(180deg, #EFFBFE 0%, #CAF0F8 100%)" }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Configurable</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Change language, turn on dark mode, save custom views, and more.
                  </p>
                </div>
                <div className="flex-1 flex items-end">
                  <div className="w-full bg-white rounded-lg p-3 shadow-md border border-gray-200 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={i2}
                      alt="Configuration dropdown menu with various options"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Omnichannel - Bottom of stack */}
            <div
              className="rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 group flex-1"
              style={{ background: "linear-gradient(180deg, #EFFBFE 0%, #CAF0F8 100%)" }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Omnichannel</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    See all your support conversations in one place.
                  </p>
                </div>
                <div className="flex-1 flex items-end">
                  <div className="w-full justify-center ">
                    <img
                      src={i3}
                      alt="Social media integration showing various platform icons"
                      className="w-80% h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 3 Equal Cards */}

        {/* Multiplayer */}
        <div
          className="rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 group"
          style={{ background: "linear-gradient(180deg, #EFFBFE 0%, #CAF0F8 100%)" }}
        >
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multiplayer</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Collaborate efficiently with teammates in real time thanks to co-presence indicators, notes, and
                @mentions.
              </p>
            </div>
            <div className="flex-1 flex items-end">
              <div className="w-100px">
                <img
                  src={i4}
                  alt="Multiplayer collaboration interface with user presence"
                  className="w-100px h-32 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lightning fast */}
        <div
          className="rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 group"
          style={{ background: "linear-gradient(180deg, #EFFBFE 0%, #CAF0F8 100%)" }}
        >
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning fast</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Win time back with powerful macros, nonexistent load times, and simple shortcuts that put your entire
                Inbox a Cmd+K away.
              </p>
            </div>
            <div className="flex-1 flex items-end">
              <div className="w-full">
                <img
                  src={i5}
                  alt="Quick actions search interface with shortcuts"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team management */}
        <div
          className="rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 group"
          style={{ background: "linear-gradient(180deg, #EFFBFE 0%, #CAF0F8 100%)" }}
        >
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Team management</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Get more done by optimizing operations with live dashboards, reporting, work management tools, and more.
              </p>
            </div>
            <div className="flex-1 flex items-end">
              <div className="w-full">
                <img
                  src={i6}
                  alt="Team dashboard with metrics and analytics"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureBentoGrid
