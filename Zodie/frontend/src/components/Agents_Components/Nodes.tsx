import "./integrations-section.css"
import sphere from "@/assets/agentic/Sphere.gif"
const IntegrationsSection = () => {
  return (
    <div className="integrations-container">
      {/* Header */}
      <div className="header">
        <div className="integrations-badge">
          <span className="badge-icon">⚡</span>
          Integrations
        </div>
        <h1 className="title">Integrates with</h1>
        <p className="subtitle">Seamlessly integrate with all of your favorite agents</p>
      </div>

      {/* Main Integration Layout */}
      <div className="integration-layout">
        {/* Left Side Nodes */}
        <div className="left-nodes">
          {/* Top Left Node */}
          <div className="node-container top">
            <div className="app-node">
              <img src={sphere} alt="Integration" className="node-gif" />
            </div>
          </div>

          {/* Middle Left Node */}
          <div className="node-container middle">
            <div className="app-node">
              <img src={sphere} alt="Integration" className="node-gif" />
            </div>
          </div>

          {/* Bottom Left Node */}
          <div className="node-container bottom">
            <div className="app-node">
              <img src={sphere} alt="Integration" className="node-gif" />
            </div>
          </div>
        </div>

        {/* Connection Lines Left */}
        <div className="connections-left">
          {/* Top curved connection */}
          <svg
            className="connection-svg top-connection"
            xmlns="http://www.w3.org/2000/svg"
            width="437"
            height="193"
            fill="none"
          >
            <path
              d="M 0 1 L 122.022 1 C 130.298 1 137.01 7.702 137.022 15.978 L 137.175 122.029 C 137.187 130.302 143.895 137.003 152.168 137.007 L 275.007 137.066 C 283.289 137.07 290 143.785 290 152.066 L 290 177 C 290 185.284 296.716 192 305 192 L 437 192"
              fill="transparent"
              stroke="rgb(45,106,119)"
              strokeMiterlimit="10"
              strokeDasharray="5,3"
            />
          </svg>

          {/* Middle straight connection */}
          <div className="straight-connection">
            <div className="dotted-line"></div>
          </div>

          {/* Bottom curved connection */}
          <svg
            className="connection-svg bottom-connection"
            xmlns="http://www.w3.org/2000/svg"
            width="437"
            height="193"
            fill="none"
          >
            <path
              d="M 0 192 L 122.022 192 C 130.298 192 137.01 185.298 137.022 177.022 L 137.175 70.971 C 137.187 62.698 143.906 55.997 152.179 55.993 L 274.996 55.933 C 283.278 55.93 290 49.215 290 40.933 L 290 16 C 290 7.716 296.716 1 305 1 L 437 1"
              fill="transparent"
              stroke="rgb(45,106,119)"
              strokeMiterlimit="10"
              strokeDasharray="5,3"
            />
          </svg>
        </div>

        {/* Center Hub */}
        <div className="center-hub">
          <div className="hub-node">
            <img src={sphere} alt="Central Hub" className="hub-gif" />
          </div>
        </div>

        {/* Connection Lines Right */}
        <div className="connections-right">
          {/* Top curved connection */}
          <svg
            className="connection-svg top-connection"
            xmlns="http://www.w3.org/2000/svg"
            width="437"
            height="191"
            fill="none"
          >
            <path
              d="M 437 0 L 314.978 0 C 306.702 0 299.99 6.702 299.978 14.978 L 299.825 121.029 C 299.813 129.302 293.105 136.003 284.832 136.007 L 161.993 136.066 C 153.711 136.07 147 142.785 147 151.066 L 147 176 C 147 184.284 140.284 191 132 191 L 0 191"
              fill="transparent"
              stroke="rgb(45,106,119)"
              strokeMiterlimit="10"
              strokeDasharray="5,3"
            />
          </svg>

          {/* Middle straight connection */}
          <div className="straight-connection">
            <div className="dotted-line"></div>
          </div>

          {/* Bottom curved connection */}
          <svg
            className="connection-svg bottom-connection"
            xmlns="http://www.w3.org/2000/svg"
            width="437"
            height="193"
            fill="none"
          >
            <path
              d="M 437 192 L 314.978 192 C 306.702 192 299.99 185.298 299.978 177.022 L 299.825 70.971 C 299.813 62.698 293.105 55.997 284.832 55.993 L 161.993 55.933 C 153.711 55.93 147 49.215 147 40.933 L 147 16 C 147 7.716 140.284 1 132 1 L 0 1"
              fill="transparent"
              stroke="rgb(45,106,119)"
              strokeMiterlimit="10"
              strokeDasharray="5,3"
            />
          </svg>
        </div>

        {/* Right Side Nodes */}
        <div className="right-nodes">
          {/* Top Right Node */}
          <div className="node-container top">
            <div className="app-node">
              <img src={sphere} alt="Integration" className="node-gif" />
            </div>
          </div>

          {/* Middle Right Node */}
          <div className="node-container middle">
            <div className="app-node">
              <img src={sphere} alt="Integration" className="node-gif" />
            </div>
          </div>

          {/* Bottom Right Node */}
          <div className="node-container bottom">
            <div className="app-node">
              <img src={sphere} alt="Integration" className="node-gif" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features">
        <div className="feature">
          <div className="feature-icon">🔄</div>
          <span>Seamless Automation</span>
        </div>
        <div className="feature">
          <div className="feature-icon">⏱️</div>
          <span>Real-Time Data Sync</span>
        </div>
        <div className="feature">
          <div className="feature-icon">⚙️</div>
          <span>Customizable Solutions</span>
        </div>
      </div>
    </div>
  )
}

export default IntegrationsSection
