import React from "react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import './PricingSection.scss';
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

function PricingSection() {
  return (
    <div className="pricing-section">
      <div className="container">
        <div className="headings">
          <h4 className="sub_heading">Plans</h4>
          <h2 className="heading">Simple, Transparent Pricing</h2>
          <p className="desc">
            Choose the perfect plan to grow your beauty business
          </p>
        </div>
        <div className="pricing-plans">
          <div className="plan">
            <div className="plan-header">
              <h4 className="plan-title">Starter</h4>
              <p className="plan-desc">
                Perfect for individual professionals starting out
              </p>
            </div>
            <div className="plan-body">
              <div className="plan-price">
                <h3 className="price">Free</h3>
                <p className="billing-cycle">forever</p>
              </div>
              <hr className="divider" />
              <div className="plan-features">
                <ul className="features-list">
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Basic profile listing</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Up to 5 portfolio images</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Receive bookings</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Basic analytics</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Email support</p>
                  </li>
                </ul>
              </div>
              <Link to={ROUTES.loginSignup} className="get-started">Get started</Link>
            </div>
          </div>
          <div className="plan popular">
            <div className="badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-sparkles w-3.5 h-3.5"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                <path d="M20 3v4"></path>
                <path d="M22 5h-4"></path>
                <path d="M4 17v2"></path>
                <path d="M5 18H3"></path>
              </svg>
              <p>most popular</p>
            </div>
            <div className="plan-header">
              <h4 className="plan-title">Professional</h4>
              <p className="plan-desc">
                Most popular choice for growing businesses
              </p>
            </div>
            <div className="plan-body">
              <div className="plan-price">
                <h3 className="price">PKR 2,999</h3>
                <p className="billing-cycle">per month</p>
              </div>
              <hr className="divider" />
              <div className="plan-features">
                <ul className="features-list">
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Premium profile placement</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Unlimited portfolio images</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Priority bookings</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Advanced analytics & insights</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Priority support</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Featured in search results</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Custom booking page</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Promotional tools</p>
                  </li>
                </ul>
              </div>
              <Link to={ROUTES.loginSignup} className="get-started">Get started</Link>
            </div>
          </div>
          <div className="plan">
            <div className="plan-header">
              <h4 className="plan-title">Premium</h4>
              <p className="plan-desc">
                For established businesses that want it all
              </p>
            </div>
            <div className="plan-body">
              <div className="plan-price">
                <h3 className="price">PKR 4,999</h3>
                <p className="billing-cycle">per month</p>
              </div>
              <hr className="divider" />
              <div className="plan-features">
                <ul className="features-list">
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Everything in Professional</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Top placement guarantee</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Verified badge</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Social media integration</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Dedicated account manager</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>Marketing campaigns</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>API access</p>
                  </li>
                  <li>
                    <div className="icon">
                      <DoneOutlinedIcon />
                    </div>
                    <p>White-label options</p>
                  </li>
                </ul>
              </div>
              <Link to={ROUTES.loginSignup} className="get-started">Get started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
