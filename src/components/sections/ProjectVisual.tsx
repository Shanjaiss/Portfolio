import { ArrowUpRight, Check } from 'lucide-react'
import type { Project } from '../../data/projects'

function ProjectVisual({
  type,
  name,
}: {
  type: Project['visual']
  name: string
}) {
  return (
    <div
      className={`project-visual visual-${type}`}
      role="img"
      aria-label={`${name} conceptual illustration, not a proprietary application screenshot`}
    >
      <div className="visual-window">
        <div className="visual-window-top">
          <span />
          <span />
          <span />
          <i>{type === 'copilot' ? 'LOCAL AI RUNTIME' : 'CONCEPTUAL UI'}</i>
        </div>
        {type === 'copilot' && (
          <div className="copilot-ui">
            <div className="copilot-header">
              <span>LOCAL AI ASSISTANT</span>
              <i>QWEN2.5-CODER · OLLAMA</i>
            </div>
            <div className="copilot-stats">
              <span>
                BACKEND
                <strong>190 PYTEST PASS</strong>
              </span>
              <span>
                FRONTEND
                <strong>125 VITEST PASS</strong>
              </span>
              <span>
                PRIVACY
                <strong className="green-text">100% AIR-GAPPED</strong>
              </span>
            </div>
            <div className="copilot-code">
              <div>
                <span className="copilot-keyword">def</span>{' '}
                <span className="copilot-fn">analyze_ast</span>(code_tree):
              </div>
              <div className="copilot-comment">
                # Local repository intelligence &amp; zero data leakage
              </div>
              <div>
                &nbsp;&nbsp;<span className="copilot-keyword">return</span>{' '}
                copilot.<span className="copilot-fn">evaluate_complexity</span>
                (code_tree)
              </div>
              <div className="copilot-badge">
                <Check size={9} /> 10 Modules Verified · 315 Automated Tests
              </div>
            </div>
          </div>
        )}
        {type === 'trading' && (
          <div className="trading-ui">
            <div className="visual-sidebar">
              <b />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="trading-main">
              <div className="visual-heading">
                <span>MARKET OVERVIEW</span>
                <i>SAMPLE UI</i>
              </div>
              <div className="market-metrics">
                <span>
                  PORTFOLIO VALUE<strong>— SAMPLE</strong>
                </span>
                <span>
                  OPEN POSITIONS
                  <strong>
                    — <em>SAMPLE</em>
                  </strong>
                </span>
                <span>
                  DAY P&amp;L<strong className="green-text">— SAMPLE</strong>
                </span>
              </div>
              <div className="chart-area">
                <div className="chart-lines" />
                <svg
                  viewBox="0 0 420 100"
                  role="img"
                  aria-label="Illustrative market activity chart"
                >
                  <path d="M0 80 C25 72 30 84 52 62 S80 72 101 49 S130 57 151 44 S170 58 198 31 S223 48 246 39 S273 54 299 22 S324 38 352 30 S379 42 420 8" />
                </svg>
              </div>
              <div className="visual-table">
                <span>INSTRUMENT</span>
                <span>POSITION</span>
                <span>STATUS</span>
                <b>SYMBOL A</b>
                <b>—</b>
                <em>ACTIVE</em>
                <b>SYMBOL B</b>
                <b>—</b>
                <em>MONITORING</em>
              </div>
            </div>
          </div>
        )}
        {type === 'config' && (
          <div className="config-ui">
            <div className="config-title">
              <span>Broker connections</span>
              <i>+ Add broker</i>
            </div>
            {['Broker A', 'Broker B', 'Broker C'].map((broker, index) => (
              <div className="broker-row" key={broker}>
                <span className={`broker-logo broker-${index}`}>
                  {broker.slice(0, 1)}
                </span>
                <span>
                  <b>{broker}</b>
                  <small>
                    {index === 1
                      ? 'Static IP configured'
                      : 'Configuration active'}
                  </small>
                </span>
                <em>{index === 2 ? 'REVIEW' : 'CONNECTED'}</em>
                <ArrowUpRight size={13} />
              </div>
            ))}
            <div className="config-footer">
              <span>STATIC IP</span>
              <strong>••••••••</strong>
              <i>VALIDATED</i>
            </div>
          </div>
        )}
        {type === 'credentials' && (
          <div className="credentials-ui">
            <div className="credential-header">
              <span>API connections</span>
              <i>SECURE AREA</i>
            </div>
            <div className="credential-card">
              <span className="credential-logo">API</span>
              <span>
                <b>Broker integration</b>
                <small>Authentication settings</small>
              </span>
              <em>CONNECTED</em>
            </div>
            <div className="credential-form">
              <label>
                API KEY <span>••••••••••••••••</span>
              </label>
              <label>
                SECRET <span>••••••••••••••••</span>
              </label>
              <div className="credential-save">
                Configuration validated <Check size={13} />
              </div>
            </div>
          </div>
        )}
        {type === 'vendor' && (
          <div className="vendor-ui">
            <div className="vendor-heading">
              <span>
                Vendors <small>/ Directory</small>
              </span>
              <i>+ Add vendor</i>
            </div>
            <div className="vendor-stats">
              <span>
                TOTAL VENDORS<strong>—</strong>
              </span>
              <span>
                ONBOARDING<strong>—</strong>
              </span>
            </div>
            <div className="vendor-table">
              <span>VENDOR</span>
              <span>STATUS</span>
              <span>UPDATED</span>
              <b>
                <i>01</i> Vendor 001
              </b>
              <em>ACTIVE</em>
              <small>Today</small>
              <b>
                <i>02</i> Vendor 002
              </b>
              <em className="pending">REVIEW</em>
              <small>Yesterday</small>
              <b>
                <i>03</i> Vendor 003
              </b>
              <em>ACTIVE</em>
              <small>Recently</small>
            </div>
          </div>
        )}
      </div>
      <span className="visual-caption">
        {type === 'copilot'
          ? 'Local-first architecture · 315 verified automated tests'
          : 'Illustrative concept · No proprietary product imagery'}
      </span>
    </div>
  )
}

export default ProjectVisual
