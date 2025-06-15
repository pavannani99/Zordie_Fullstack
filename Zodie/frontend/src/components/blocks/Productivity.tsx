import { Card, CardContent } from "@/components/ui/card"

export default function Productivity() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              How Our <span className="text-blue-600">Tool Enhances</span>
              <br />
              Team <span className="text-gray-700">Productivity</span>
            </h1>
          </div>
          <div className="flex items-center">
            <p className="text-lg text-gray-600 leading-relaxed">
              Boost your team's efficiency and collaboration effortlessly with our intuitive and powerful platform,
              designed for success.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Manage Projects Card */}
          <Card className="p-6 bg-white border-2 border-gray-200 rounded-3xl">
            <CardContent className="p-0">
              {/* Mock UI for User List Menu */}
              <div className="mb-6">
                <img
                  src="https://framerusercontent.com/images/jJ74tYvFz8uCvLrQT3gH6Lkm5G8.png"
                  alt="Project management interface showing task lists, progress bars, and team collaboration tools"
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold mb-3">
                  Manage <span className="text-blue-600">Projects</span>
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Organize tasks, establish deadlines, and assign responsibilities to ensure everyone is on the same
                  page.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Collaborate Instantly Card */}
          <Card className="p-6 bg-white border-2 border-gray-200 rounded-3xl">
            <CardContent className="p-0">
              {/* Mock UI for Live Collaboration */}
              <div className="mb-6">
                <img
                  src="https://framerusercontent.com/images/IYIJmUicy668ZHCB8Ot6T3ytcU.png"
                  alt="Live collaboration interface showing real-time updates and team communications"
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold mb-3">
                  Collaborate <span className="text-blue-600">Instantly</span>
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Work together in real-time, share updates instantly, and communicate seamlessly across departments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analyze Performance Card */}
          <Card className="p-6 bg-white border-2 border-gray-200 rounded-3xl">
            <CardContent className="p-0">
              {/* Mock UI for Performance Dashboard */}
              <div className="mb-6">
                <img
                  src="https://framerusercontent.com/images/fWtVyxIqdx14eVmo7xyCGQpb4os.png"
                  alt="Performance analytics dashboard with charts, metrics, and data visualization"
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold mb-3">
                  Analyze <span className="text-blue-600">Performance</span>
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Track progress, identify bottlenecks, and make data-driven decisions to improve overall team
                  performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
